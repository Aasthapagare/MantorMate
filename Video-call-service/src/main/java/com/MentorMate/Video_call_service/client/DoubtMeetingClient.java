package com.MentorMate.Video_call_service.client;

import com.MentorMate.Video_call_service.entity.Meeting;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "MEETING-SERVICE", path = "/api/meetings")
public interface DoubtMeetingClient {

    @GetMapping("/student/{studentId}/all")
    List<Meeting> getAllMeetings(@PathVariable Long studentId);
}