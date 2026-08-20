package com.divya.Progress_Service.config;

import com.divya.Progress_Service.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "auth-service", url = "http://localhost:9093")
public interface AuthClient {
    @GetMapping("/users/{id}")
    UserDto getUserById(
            @PathVariable String id,
            @RequestHeader("Authorization") String token
    );
}
