package com.MentorMate.project_management_service.service;

import com.MentorMate.project_management_service.client.AuthClient;
import com.MentorMate.project_management_service.dto.*;
import com.MentorMate.project_management_service.entity.*;
import com.MentorMate.project_management_service.repo.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.FileSystemException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private GroupMemberRepository memberRepository;
    @Autowired
    private GuideRepository guideRepository;
    @Autowired
    private GuidePreferenceRepository guidePreferenceRepository;
    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private AuthClient authClient;
    @Autowired
    private GuideAllocationRepository guideAllocationRepository;
    @Value("${file.upload-dir}")
    private String uploadDir;
    // CREATE GROUP
    public ProjectGroups createGroup(CreateGroupRequest request){

        // duplicate group check
        if(memberRepository.existsByUserId(request.getLeaderId())){
            throw new RuntimeException("User already part of a group");
        }
        ProjectGroups projectGroups = new ProjectGroups();
        projectGroups.setGroupName(request.getGroupName());
        projectGroups.setLeaderId(request.getLeaderId());
        ProjectGroups savedGroup = groupRepository.save(projectGroups);
        GroupMember leader = new GroupMember();
        leader.setGroupId(savedGroup.getId());
        leader.setUserId(request.getLeaderId());
        leader.setRole("LEADER");
        memberRepository.save(leader);
        return savedGroup;
    }
    // ADD MEMBER
    public String addMember(Long groupId, String actorId, String userId, String token){
        assertLeader(groupId, actorId);

        UserDto user = authClient.getUser(userId,token);

        if(user == null){
            throw new RuntimeException("User not found");
        }

        if(memberRepository.existsByUserId(userId)){
            throw new RuntimeException("User already in group");
        }

        long memberCount = memberRepository.countByGroupId(groupId);

        if(memberCount >= 4){
            throw new RuntimeException("Group already full");
        }

        GroupMember member = new GroupMember();
        member.setGroupId(groupId);
        member.setUserId(userId);
        member.setRole("MEMBER");

        memberRepository.save(member);

        return "Member added successfully";
    }

    public String removeMember(Long groupId, String actorId, String userId) {
        assertLeader(groupId, actorId);

        GroupMember member = memberRepository.findByGroupIdAndUserId(groupId, userId)
                .orElseThrow(() -> new RuntimeException("Member not found in group"));

        if ("LEADER".equalsIgnoreCase(member.getRole())) {
            throw new RuntimeException("Group leader cannot be removed");
        }

        memberRepository.deleteByGroupIdAndUserId(groupId, userId);
        return "Member removed successfully";
    }
    // GET ALL GUIDES

    public GroupDetailsDto getGroupDetails(Long groupId) {

        ProjectGroups group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        // Correct way to fetch members
        List<GroupMember> members = memberRepository.findByGroupId(groupId);

        GroupDetailsDto dto = new GroupDetailsDto();

        dto.setGroupId(group.getId());
        dto.setGroupName(group.getGroupName());
        dto.setLeaderId(group.getLeaderId());
        dto.setProjectTitle(group.getProjectTitle());
        dto.setProjectIdea(group.getProjectIdea());
        dto.setIdeaStatus(group.getIdeaStatus());

        List<String> memberIds = members.stream()
                .map(GroupMember::getUserId)
                .toList();

        dto.setMembers(memberIds);
        dto.setMemberDetails(memberIds.stream()
                .map(memberId -> mapMemberDetails(memberId, null))
                .toList());

        return dto;
    }


    // SELECT 2 GUIDES


    // SUBMIT PROJECT IDEA
    public String submitIdea(Long groupId, String actorId, IdeaRequest request){
        assertLeader(groupId, actorId);

        ProjectGroups projectGroups = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        projectGroups.setProjectTitle(request.getTitle());
        projectGroups.setProjectIdea(request.getDescription());
        projectGroups.setIdeaStatus("PENDING");

        groupRepository.save(projectGroups);

        return "Idea submitted successfully";
    }


    // ADMIN ALLOCATE GUIDE
    public String allocateGuide(Long groupId,Long guideId){

        GuidePreference allocation = new GuidePreference();
        allocation.setGroupId(groupId);
        allocation.setGuideId(String.valueOf(guideId));

        guidePreferenceRepository.save(allocation);

        return "Guide allocated";
    }
    // UPLOAD DOCUMENT
    public String uploadDocument(Long groupId, MultipartFile file, String userId){
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Please select a file to upload");
        }
        assertGroupMember(groupId, userId);

        String originalFileName = Optional.ofNullable(file.getOriginalFilename())
                .filter(name -> !name.isBlank())
                .orElse("document");
        String safeFileName = originalFileName.replaceAll("[^a-zA-Z0-9._-]", "_");
        String storedFileName = UUID.randomUUID() + "_" + safeFileName;

        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            Path targetPath = uploadPath.resolve(storedFileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException exception) {
            throw new RuntimeException("Failed to store document", exception);
        }

        Document doc = new Document();
        doc.setGroupId(groupId);
        doc.setFileName(originalFileName);
        doc.setFileUrl("/uploads/" + storedFileName);
        doc.setUploadedBy(userId);

        documentRepository.save(doc);

        return "Document uploaded";
    }
    // GET DOCUMENTS
    public List<Document> getDocuments(Long groupId){
        return documentRepository.findByGroupId(groupId);
    }

    public String deleteDocument(Long groupId, Long documentId, String userId) {
        String normalizedUserId = normalizeUserId(userId);
        assertGroupMember(groupId, normalizedUserId);

        Document document = documentRepository.findByIdAndGroupId(documentId, groupId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        if (!normalizeUserId(document.getUploadedBy()).equals(normalizedUserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can delete only your own documents");
        }

        try {
            if (document.getFileUrl() != null && !document.getFileUrl().isBlank()) {
                String storedFileName = document.getFileUrl().replaceFirst("^/uploads/", "");
                Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
                Path targetPath = uploadPath.resolve(storedFileName).normalize();
                Files.deleteIfExists(targetPath);
            }
        } catch (FileSystemException ignored) {
            // Keep DB cleanup even if file is locked or already removed.
        } catch (IOException exception) {
            throw new RuntimeException("Failed to delete document file", exception);
        }

        documentRepository.delete(document);
        return "Document deleted";
    }
    public String selectGuides(Long groupId, String actorId, List<String> guideIds){
        assertLeader(groupId, actorId);

        if(guideIds == null || guideIds.size() != 2){
            throw new RuntimeException("Exactly 2 guides must be selected");
        }

        if (guideIds.stream().anyMatch(guideId -> guideId == null || guideId.isBlank())) {
            throw new RuntimeException("Guide selection contains invalid guide ids");
        }

        if (guideIds.get(0).equals(guideIds.get(1))) {
            throw new RuntimeException("Please select two different guides");
        }

        // Replace any older guide preference rows so existing groups can reselect guides cleanly.
        guidePreferenceRepository.deleteByGroupId(groupId);

        GuidePreference pref1 = new GuidePreference();
        pref1.setGroupId(groupId);
        pref1.setGuideId(guideIds.get(0));
        pref1.setPreferenceOrder(1);

        GuidePreference pref2 = new GuidePreference();
        pref2.setGroupId(groupId);
        pref2.setGuideId(guideIds.get(1));
        pref2.setPreferenceOrder(2);

        guidePreferenceRepository.save(pref1);
        guidePreferenceRepository.save(pref2);

        return "Guides selected successfully";
    }
    public GroupDashboardDto getDashboard(Long groupId, String token){

        ProjectGroups projectGroups = groupRepository.findById(groupId).orElseThrow();

        List<GroupMember> members =
                memberRepository.findByGroupId(groupId);

        List<GuidePreference> guides =
                guidePreferenceRepository.findByGroupId(groupId);

        GuideAllocation allocation =
                guideAllocationRepository.findByGroupId(groupId);

        List<Document> docs =
                documentRepository.findByGroupId(groupId);

        GroupDashboardDto dto = new GroupDashboardDto();

        dto.setGroupName(projectGroups.getGroupName());
        dto.setLeaderId(projectGroups.getLeaderId());
        dto.setProjectTitle(projectGroups.getProjectTitle());
        dto.setProjectIdea(projectGroups.getProjectIdea());
        dto.setIdeaStatus(projectGroups.getIdeaStatus());

        dto.setMembers(members);
        dto.setMemberDetails(members.stream()
                .map(member -> mapMemberDetails(member.getUserId(), token))
                .toList());
        dto.setPreferredGuides(guides);
        dto.setAllocatedGuide(allocation);
        dto.setDocuments(docs);
        return dto;
    }
    public Long getGroupIdByUser(String userId) {
        return memberRepository.findByUserId(userId)
                .map(GroupMember::getGroupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
    }

    private GroupMemberDto mapMemberDetails(String memberId, String token) {
        GroupMemberDto dto = new GroupMemberDto();
        dto.setUserId(memberId);

        if (token == null || token.isBlank()) {
            return dto;
        }

        UserDto user = authClient.getUser(memberId, token);
        if (user != null) {
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setRole(user.getRole());
        }

        return dto;
    }

    private void assertLeader(Long groupId, String actorId) {
        if (actorId == null || actorId.isBlank()) {
            throw new RuntimeException("Unauthorized user");
        }

        ProjectGroups group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        if (!actorId.equals(group.getLeaderId())) {
            throw new RuntimeException("Only the group leader can perform this action");
        }
    }

    private void assertGroupMember(Long groupId, String userId) {
        String normalizedUserId = normalizeUserId(userId);

        if (normalizedUserId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user");
        }

        boolean memberExists = memberRepository.findByGroupId(groupId)
                .stream()
                .map(GroupMember::getUserId)
                .filter(Objects::nonNull)
                .map(this::normalizeUserId)
                .anyMatch(normalizedUserId::equals);

        if (!memberExists) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only group members can manage documents");
        }
    }

    private String normalizeUserId(String userId) {
        if (userId == null) {
            return "";
        }

        return userId.trim().toUpperCase(Locale.ROOT);
    }

}
