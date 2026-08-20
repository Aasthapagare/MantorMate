package com.MentorMate.project_management_service.controller;

import com.MentorMate.project_management_service.client.AuthClient;
import com.MentorMate.project_management_service.dto.*;
import com.MentorMate.project_management_service.entity.Document;
import com.MentorMate.project_management_service.entity.ProjectGroups;
import com.MentorMate.project_management_service.entity.Guide;
import com.MentorMate.project_management_service.service.GroupService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/groups")
public class GroupController {
    @Autowired
    private GroupService service;
    @Autowired
    private AuthClient authClient;


    // CREATE GROUP
    @PostMapping("/create")
    public ProjectGroups createGroup(
            HttpServletRequest request,
            @RequestBody CreateGroupRequest dto){

        String userId = (String) request.getAttribute("userId");

        dto.setLeaderId(userId);

        return service.createGroup(dto);
    }


    // ADD MEMBER
    @PostMapping("/{groupId}/add-member")
    public String addMember(
            HttpServletRequest servletRequest,
            @PathVariable Long groupId,
            @RequestBody AddMembersRequest request,
            @RequestHeader("Authorization") String token
    ) {
        String actorId = (String) servletRequest.getAttribute("userId");
        return service.addMember(groupId, actorId, request.getUserId(), token);
    }

    @DeleteMapping("/{groupId}/members/{userId}")
    public String removeMember(
            HttpServletRequest request,
            @PathVariable Long groupId,
            @PathVariable String userId
    ) {
        String actorId = (String) request.getAttribute("userId");
        return service.removeMember(groupId, actorId, userId);
    }


    // GET ALL GUIDES
    @GetMapping("/guides")
    public List<UserDto> getGuides(@RequestHeader("Authorization") String token) {
        System.out.println("TOKEN RECEIVED: " + token);
        return authClient.getAllGuides(token);
    }
    // SELECT GUIDES
    @PostMapping("/{groupId}/select-guides")
    public String selectGuides(
            HttpServletRequest servletRequest,
            @PathVariable Long groupId,
            @RequestBody GuideSelectionRequest request){
        String actorId = (String) servletRequest.getAttribute("userId");
        return service.selectGuides(groupId, actorId, request.getGuideIds());
    }

    // SUBMIT IDEA
    @PostMapping("/{groupId}/submit-idea")
    public String submitIdea(
            HttpServletRequest servletRequest,
            @PathVariable Long groupId,
            @RequestBody IdeaRequest request){
        String actorId = (String) servletRequest.getAttribute("userId");
        return service.submitIdea(groupId, actorId, request);
    }


    // ADMIN ALLOCATE GUIDE
    @PostMapping("/admin/allocate-guide")
    public String allocateGuide(
            @RequestParam Long groupId,
            @RequestParam Long guideId){

        return service.allocateGuide(groupId,guideId);
    }


    // UPLOAD DOCUMENT
    @PostMapping("/{groupId}/upload")
    public String uploadDocument(
            HttpServletRequest request,
            @PathVariable Long groupId,
            @RequestParam MultipartFile file){
        String userId = (String) request.getAttribute("userId");

        return service.uploadDocument(groupId,file,userId);
    }
    @GetMapping("/{groupId}/details")
    public ResponseEntity<GroupDetailsDto> getGroupDetails(@PathVariable Long groupId){

        return ResponseEntity.ok(service.getGroupDetails(groupId));
    }


    // GET DOCUMENTS
    @GetMapping("/{groupId}/documents")
    public List<Document> getDocuments(@PathVariable Long groupId){
        return service.getDocuments(groupId);
    }

    @DeleteMapping("/{groupId}/documents/{documentId}")
    public String deleteDocument(
            HttpServletRequest request,
            @PathVariable Long groupId,
            @PathVariable Long documentId) {
        String userId = (String) request.getAttribute("userId");
        return service.deleteDocument(groupId, documentId, userId);
    }

    @GetMapping("/{groupId}/dashboard")
    public GroupDashboardDto getDashboard(
            @PathVariable Long groupId,
            @RequestHeader(value = "Authorization", required = false) String token){

        return service.getDashboard(groupId, token);
    }
    @GetMapping("/user/{userId}")
    public Long getGroupId(@PathVariable String userId) {
        return service.getGroupIdByUser(userId);
    }
}
