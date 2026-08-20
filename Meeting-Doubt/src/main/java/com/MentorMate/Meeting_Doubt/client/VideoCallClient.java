package com.MentorMate.Meeting_Doubt.client;

import com.MentorMate.Meeting_Doubt.entity.Meeting;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "VIDEO-CALL-SERVICE", path = "/api/meetings")
public interface VideoCallClient {

    @PostMapping("/request")
    Meeting createMeeting(@RequestBody Meeting meeting);

    @PutMapping("/approve/{id}")
    Meeting approveMeeting(@PathVariable Long id,
                           @RequestParam String scheduledTime);
}
