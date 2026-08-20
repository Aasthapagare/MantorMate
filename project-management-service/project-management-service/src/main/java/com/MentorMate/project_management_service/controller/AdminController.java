package com.MentorMate.project_management_service.controller;

import com.MentorMate.project_management_service.dto.AdminGroupAllocationDto;
import com.MentorMate.project_management_service.dto.AllocateGuideRequest;
import com.MentorMate.project_management_service.dto.PresentationScheduleRequest;
import com.MentorMate.project_management_service.entity.PresentationSchedule;
import com.MentorMate.project_management_service.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService service;

    @GetMapping("/presentation-schedules")
    public List<PresentationSchedule> getPresentationSchedules() {
        return service.getPresentationSchedules();
    }

    @PostMapping("/presentation-schedules")
    public PresentationSchedule createPresentationSchedule(
            @RequestBody PresentationScheduleRequest request) {
        return service.createPresentationSchedule(request);
    }

    @DeleteMapping("/presentation-schedules/{id}")
    public void deletePresentationSchedule(@PathVariable Long id) {
        service.deletePresentationSchedule(id);
    }


    @GetMapping("/group-guide-allocations")
    public List<AdminGroupAllocationDto> getGroupGuideAllocations(
            @RequestHeader("Authorization") String token) {
        return service.getGroupAllocations(token);
    }


    @PostMapping("/allocate-guide")
    public String allocateGuide(
            HttpServletRequest request,
            @RequestBody AllocateGuideRequest dto) {

        String adminId = (String) request.getAttribute("userId");

        return service.allocateGuide(dto.getGroupId(), dto.getGuideId(), adminId);
    }


}
