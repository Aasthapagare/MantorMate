package com.divya.Communicationservice.client;

import com.divya.Communicationservice.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "auth-service", url = "http://localhost:9093")
public interface AuthClient {
    @GetMapping("/auth/users/guides")
    List<UserDTO> getAllGuides(
            @RequestHeader("Authorization") String token
    );

    @GetMapping("/users/students")
    List<UserDTO> getAllStudents(
            @RequestHeader("Authorization") String token
    );

    @GetMapping("/users/all")
    List<UserDTO> getAllUsers(
            @RequestHeader("Authorization") String token
    );

}
