package com.MentorMate.project_management_service.service;

import com.MentorMate.project_management_service.entity.ProjectGroups;
import com.MentorMate.project_management_service.repo.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuideServiceImpl implements GuideServices{
    @Autowired
    private GroupRepository projectGroupRepository;
    @Autowired
    private GuideService guideService;

    @Override
    public String reviewIdea(Long groupId, String status) {
        guideService.validateGuideAccess(groupId);

        ProjectGroups group = projectGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        group.setIdeaStatus(status);

        projectGroupRepository.save(group);

        return "Idea " + status + " successfully";
    }
}
