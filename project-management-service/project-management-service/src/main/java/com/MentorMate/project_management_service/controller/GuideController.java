package com.MentorMate.project_management_service.controller;

import com.MentorMate.project_management_service.dto.GroupDetailsDto;
import com.MentorMate.project_management_service.dto.UserDto;
import com.MentorMate.project_management_service.entity.Document;
import com.MentorMate.project_management_service.entity.ProjectGroups;
import com.MentorMate.project_management_service.dto.ReviewRequest;
import com.MentorMate.project_management_service.service.GuideService;
import com.MentorMate.project_management_service.service.GuideServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guide")
public class GuideController {
    @Autowired
    private GuideService guideService;
    @Autowired
    private GuideServices guideServices;

    @GetMapping("/get")
    public List<UserDto> getGuides(){

        return guideService.getAllGuides();
    }

    @GetMapping("/groups")
    public List<GroupDetailsDto> getGroups(){
        return guideService.getGuideGroupDetails();
    }


    @GetMapping("/documents/{groupId}")
    public List<Document> getDocuments(@PathVariable Long groupId){

        return guideService.getDocuments(groupId);
    }
    @PostMapping("/idea/{groupId}/review")
    public String reviewIdea(
            @PathVariable Long groupId,
            @RequestBody ReviewRequest request) {

        return guideServices.reviewIdea(groupId, request.getStatus());
    }

}
