package com.MentorMate.Meeting_Doubt.controller;

import com.MentorMate.Meeting_Doubt.entity.Meeting;
import com.MentorMate.Meeting_Doubt.entity.MeetingStatus;
import com.MentorMate.Meeting_Doubt.service.MeetingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    private Long getAuthenticatedUserId(HttpServletRequest request) {
        Object userId = request.getAttribute("userId");
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        String normalized = userId.toString().trim();
        try {
            return Long.parseLong(normalized);
        } catch (NumberFormatException ignored) {
            String digitsOnly = normalized.replaceAll("\\D", "");
            if (digitsOnly.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user id");
            }
            return Long.parseLong(digitsOnly);
        }
    }

    private String getAuthenticatedUserIdentifier(HttpServletRequest request) {
        Object userId = request.getAttribute("userId");
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return userId.toString().trim();
    }

    private String getAuthenticatedRole(HttpServletRequest request) {
        Object role = request.getAttribute("role");
        if (role == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return role.toString().trim().toUpperCase();
    }

    private void requireRole(HttpServletRequest request, String expectedRole) {
        String actualRole = getAuthenticatedRole(request);
        boolean roleMatches = expectedRole.equals(actualRole)
                || ("GUIDE".equals(expectedRole) && "PROJECT GUIDE".equals(actualRole));
        if (!roleMatches) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
    }

    // ===============================
    // 1️⃣ STUDENT APIs
    // ===============================

    // Create meeting request
    @PostMapping("/request")
    public Meeting createMeeting(@RequestBody Meeting meeting, HttpServletRequest request) {
        requireRole(request, "STUDENT");
        meeting.setStudentId(getAuthenticatedUserId(request));
        meeting.setStudentEnrollment(getAuthenticatedUserIdentifier(request));
        meeting.setStatus(MeetingStatus.PENDING);
        return meetingService.createMeetingRequest(meeting);
    }

    // Get only APPROVED meetings
    @GetMapping("/student/{studentId}/approved")
    public List<Meeting> getApprovedMeetings(@PathVariable Long studentId, HttpServletRequest request) {
        requireRole(request, "STUDENT");
        Long authenticatedUserId = getAuthenticatedUserId(request);
        return meetingService.getApprovedMeetingsForStudent(authenticatedUserId);
    }


    // Get ALL meetings (history)
    @GetMapping("/student/{studentId}/all")
    public List<Meeting> getAllStudentMeetings(@PathVariable Long studentId, HttpServletRequest request) {
        requireRole(request, "STUDENT");
        Long authenticatedUserId = getAuthenticatedUserId(request);
        return meetingService.getAllMeetingsForStudent(authenticatedUserId);
    }

    // Cancel meeting (before approval)
    @PutMapping("/cancel/{id}")
    public Meeting cancelMeeting(@PathVariable Long id, HttpServletRequest request) {
        requireRole(request, "STUDENT");
        Meeting meeting = meetingService.getMeetingById(id);
        if (!meeting.getStudentId().equals(getAuthenticatedUserId(request))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only cancel your own meeting");
        }
        return meetingService.cancelMeeting(id);
    }

    // ===============================
    // 2️⃣ GUIDE APIs
    // ===============================

    // Approve + Schedule meeting
    @PutMapping("/approve/{id}")
    public Meeting approveMeeting(
            @PathVariable Long id,
            @RequestParam String scheduledTime,
            HttpServletRequest request
    ) {
        requireRole(request, "GUIDE");
        Meeting meeting = meetingService.getMeetingById(id);
        if (!meeting.getGuideId().equals(getAuthenticatedUserId(request))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only approve your own meeting requests");
        }
        return meetingService.approveMeeting(id, scheduledTime);
    }

    // Reject meeting
    @PutMapping("/reject/{id}")
    public Meeting rejectMeeting(@PathVariable Long id, HttpServletRequest request) {
        requireRole(request, "GUIDE");
        Meeting meeting = meetingService.getMeetingById(id);
        if (!meeting.getGuideId().equals(getAuthenticatedUserId(request))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only reject your own meeting requests");
        }
        return meetingService.rejectMeeting(id);
    }

    // Mark meeting as completed
    @PutMapping("/complete/{id}")
    public Meeting completeMeeting(@PathVariable Long id, HttpServletRequest request) {
        requireRole(request, "GUIDE");
        Meeting meeting = meetingService.getMeetingById(id);
        if (!meeting.getGuideId().equals(getAuthenticatedUserId(request))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only complete your own meetings");
        }
        return meetingService.completeMeeting(id);
    }

    // Get all meetings for guide
    @GetMapping("/guide/{guideId}")
    public List<Meeting> getGuideMeetings(@PathVariable Long guideId, HttpServletRequest request) {
        requireRole(request, "GUIDE");
        Long authenticatedUserId = getAuthenticatedUserId(request);
        return meetingService.getGuideMeetings(authenticatedUserId);
    }
}
