package com.MentorMate.Video_call_service.controller;

import com.MentorMate.Video_call_service.entity.Meeting;
import com.MentorMate.Video_call_service.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin("*")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    @GetMapping("/create")
    public Map<String, String> createMeeting() {

        String roomName = "mentorMate-" + UUID.randomUUID();

        Map<String, String> response = new HashMap<>();
        response.put("roomName", roomName);

        return response;
    }
    @PostMapping("/request")
    public Meeting requestMeeting(@RequestBody Meeting meeting) {
        return meetingService.requestMeeting(meeting);
    }

    @PostMapping("/schedule/{id}")
    public Meeting scheduleMeeting(@PathVariable Long id,
                                   @RequestParam String time) {

        LocalDateTime scheduledTime = LocalDateTime.parse(time);

        return meetingService.scheduleMeeting(id, scheduledTime);
    }
}

