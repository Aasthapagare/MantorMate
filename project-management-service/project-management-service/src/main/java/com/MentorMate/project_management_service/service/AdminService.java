package com.MentorMate.project_management_service.service;

import com.MentorMate.project_management_service.client.AuthClient;
import com.MentorMate.project_management_service.dto.AdminGroupAllocationDto;
import com.MentorMate.project_management_service.dto.GuideOptionDto;
import com.MentorMate.project_management_service.dto.PresentationScheduleRequest;
import com.MentorMate.project_management_service.dto.UserDto;
import com.MentorMate.project_management_service.entity.GuidePreference;
import com.MentorMate.project_management_service.entity.GuideAllocation;
import com.MentorMate.project_management_service.entity.PresentationSchedule;
import com.MentorMate.project_management_service.entity.ProjectGroups;
import com.MentorMate.project_management_service.repo.GroupRepository;
import com.MentorMate.project_management_service.repo.GuideAllocationRepository;
import com.MentorMate.project_management_service.repo.GuidePreferenceRepository;
import com.MentorMate.project_management_service.repo.PresentationScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class AdminService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private GuideAllocationRepository allocationRepository;

    @Autowired
    private GuidePreferenceRepository guidePreferenceRepository;

    @Autowired
    private AuthClient authClient;

    @Autowired
    private PresentationScheduleRepository presentationScheduleRepository;

    public List<ProjectGroups> getAllGroups(){

        return groupRepository.findAll();
    }

    public List<PresentationSchedule> getPresentationSchedules() {
        return presentationScheduleRepository.findAll()
                .stream()
                .sorted((left, right) -> left.getDate().compareTo(right.getDate()))
                .toList();
    }

    public PresentationSchedule createPresentationSchedule(PresentationScheduleRequest request) {
        PresentationSchedule schedule = new PresentationSchedule();
        schedule.setPresentationNo(request.getPresentationNo());
        schedule.setPresentationTitle(request.getPresentationTitle());
        schedule.setDate(request.getDate());
        schedule.setMilestoneName(request.getMilestoneName());
        schedule.setExpectedCompletion(request.getExpectedCompletion());
        schedule.setMilestoneWeight(request.getMilestoneWeight());
        schedule.setStatus("Scheduled");
        return presentationScheduleRepository.save(schedule);
    }

    public void deletePresentationSchedule(Long id) {
        presentationScheduleRepository.deleteById(id);
    }

    public List<AdminGroupAllocationDto> getGroupAllocations(String token) {
        List<ProjectGroups> groups = groupRepository.findAll();
        List<AdminGroupAllocationDto> result = new ArrayList<>();

        for (ProjectGroups group : groups) {
            List<GuidePreference> preferences = guidePreferenceRepository.findByGroupId(group.getId())
                    .stream()
                    .sorted(Comparator.comparingInt(GuidePreference::getPreferenceOrder))
                    .toList();

            GuideAllocation allocation = allocationRepository.findByGroupId(group.getId());

            AdminGroupAllocationDto dto = new AdminGroupAllocationDto();
            dto.setGroupId(group.getId());
            dto.setGroupName(group.getGroupName());
            dto.setProjectTitle(group.getProjectTitle());

            List<GuideOptionDto> selectedGuides = new ArrayList<>();
            for (GuidePreference preference : preferences) {
                GuideOptionDto option = new GuideOptionDto();
                option.setGuideId(preference.getGuideId());
                option.setPreferenceOrder(preference.getPreferenceOrder());
                option.setGuideName(resolveGuideName(preference.getGuideId(), token));

                selectedGuides.add(option);
            }
            dto.setSelectedGuides(selectedGuides);

            if (allocation != null) {
                dto.setAllocatedGuideId(allocation.getGuideId());
                dto.setAllocatedGuideName(resolveGuideName(allocation.getGuideId(), token));
                dto.setStatus("Active");
            } else {
                dto.setStatus(selectedGuides.isEmpty() ? "Pending Guide Selection" : "Pending Allocation");
            }

            result.add(dto);
        }

        return result;
    }

    public String allocateGuide(Long groupId, String guideId, String adminId){
        groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        boolean guideWasSelected = guidePreferenceRepository.findByGroupId(groupId)
                .stream()
                .anyMatch(preference -> String.valueOf(preference.getGuideId()).equals(guideId));

        if (!guideWasSelected) {
            throw new RuntimeException("Admin can only allocate one of the two guides selected by the group");
        }

        GuideAllocation allocation = allocationRepository.findByGroupId(groupId);
        if (allocation == null) {
            allocation = new GuideAllocation();
            allocation.setGroupId(groupId);
        }

        allocation.setGuideId(guideId);
        allocation.setAllocatedBy(adminId);
        allocationRepository.save(allocation);

        return "Guide allocated successfully";
    }

    private String resolveGuideName(String guideId, String token) {
        if (guideId == null || guideId.isBlank() || "null".equalsIgnoreCase(guideId)) {
            return "Unknown Guide";
        }

        try {
            UserDto guide = authClient.getUser(guideId, token);
            if (guide != null && guide.getName() != null && !guide.getName().isBlank()) {
                return guide.getName();
            }
        } catch (Exception ignored) {
        }

        return "Guide " + guideId;
    }


}
