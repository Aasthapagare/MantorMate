package com.divya.AdminService.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.divya.AdminService.DTO.UserDto;

import java.util.List;

@FeignClient(name = "auth-service-admin", url = "${services.auth.url:http://localhost:9093}")
public interface AuthClient {
    @GetMapping("/users/all")
    List<UserDto> getAllUsers(@RequestHeader(value = "Authorization", required = false) String token);

    @GetMapping("/users/students")
    List<UserDto> getStudents(@RequestHeader(value = "Authorization", required = false) String token);

    @GetMapping("/auth/users/guides")
    List<UserDto> getGuides(@RequestHeader(value = "Authorization", required = false) String token);

    @DeleteMapping("/users/{id}")
    void deleteUser(@PathVariable String id, @RequestHeader(value = "Authorization", required = false) String token);
}
