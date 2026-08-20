package com.MentorMate.project_management_service.service;

import com.MentorMate.project_management_service.client.AuthClient;
import com.MentorMate.project_management_service.dto.GroupDetailsDto;
import com.MentorMate.project_management_service.dto.GroupMemberDto;
import com.MentorMate.project_management_service.dto.UserDto;
import com.MentorMate.project_management_service.entity.Document;
import com.MentorMate.project_management_service.entity.ProjectGroups;
import com.MentorMate.project_management_service.entity.GuideAllocation;
import com.MentorMate.project_management_service.repo.DocumentRepository;
import com.MentorMate.project_management_service.repo.GroupMemberRepository;
import com.MentorMate.project_management_service.repo.GroupRepository;
import com.MentorMate.project_management_service.repo.GuideAllocationRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.MentorMate.project_management_service.entity.GroupMember;

import java.util.List;

@Service
public class GuideService {
    @Autowired
    private GuideAllocationRepository allocationRepository;
    @Autowired
    private GroupMemberRepository memberRepository;
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private AuthClient authClient;

    public void validateGuideAccess(Long groupId) {
        String guideId = (String) request.getAttribute("userId");

        if (guideId == null || guideId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Guide authentication is required");
        }

        boolean hasAccess = allocationRepository.findByGuideId(guideId)
                .stream()
                .anyMatch(allocation -> groupId.equals(allocation.getGroupId()));

        if (!hasAccess) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not assigned to this group");
        }
    }

    public List<UserDto> getAllGuides(){

        String token = request.getHeader("Authorization");

        return authClient.getAllGuides(token);
    }


    public List<GroupDetailsDto> getGuideGroupDetails() {
        String guideId = (String) request.getAttribute("userId");
        String token = request.getHeader("Authorization");
        List<GuideAllocation> allocations = allocationRepository.findByGuideId(guideId);
        List<Long> groupIds = allocations.stream()
                .map(GuideAllocation::getGroupId)
                .toList();
        List<ProjectGroups> groups = groupRepository.findByIdIn(groupIds);
        return groups.stream().map(group -> {
            GroupDetailsDto dto = new GroupDetailsDto();
            dto.setGroupId(group.getId());
            dto.setGroupName(group.getGroupName());
            dto.setProjectTitle(group.getProjectTitle());
            dto.setProjectIdea(group.getProjectIdea());
            dto.setIdeaStatus(group.getIdeaStatus());
            dto.setLeaderId(group.getLeaderId());
            List<String> members = memberRepository.findByGroupId(group.getId())
                    .stream()
                    .map(GroupMember::getUserId)
                    .toList();
            dto.setMembers(members);
            dto.setMemberDetails(members.stream()
                    .map(memberId -> mapMemberDetails(memberId, token))
                    .toList());
            return dto;
        }).toList();
    }

    private GroupMemberDto mapMemberDetails(String memberId, String token) {
        UserDto user = authClient.getUser(memberId, token);

        GroupMemberDto dto = new GroupMemberDto();
        dto.setUserId(memberId);

        if (user != null) {
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setRole(user.getRole());
        }

        return dto;
    }

    public List<Document> getDocuments(Long groupId){
        validateGuideAccess(groupId);
        return documentRepository.findByGroupId(groupId);
    }

}
