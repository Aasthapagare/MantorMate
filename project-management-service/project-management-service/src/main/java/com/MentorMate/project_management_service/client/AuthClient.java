package com.MentorMate.project_management_service.client;

import com.MentorMate.project_management_service.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name="auth-service", url="http://localhost:9093")
public interface AuthClient {
    @GetMapping("/users/{id}")
    UserDto getUser(
            @PathVariable String id,
            @RequestHeader("Authorization") String token
    );
    @GetMapping("/auth/users/guides")
    List<UserDto> getAllGuides(
            @RequestHeader("Authorization") String token
    );

}
