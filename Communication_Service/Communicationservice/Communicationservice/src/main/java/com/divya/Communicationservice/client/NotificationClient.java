package com.divya.Communicationservice.client;

import com.divya.Communicationservice.dto.NotificationDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "notification-service",
        url = "http://localhost:8083"
)
public interface NotificationClient {
    @PostMapping("/notifications")
    void sendNotification(@RequestBody NotificationDTO dto);
}