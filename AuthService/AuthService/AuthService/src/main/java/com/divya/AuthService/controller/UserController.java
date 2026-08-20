package com.divya.AuthService.controller;

import com.divya.AuthService.dto.UserDto;
import com.divya.AuthService.entity.User;
import com.divya.AuthService.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN','STUDENT','GUIDE')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable String id) {

        System.out.println("Fetching user with ID: " + id);

        User user = userRepository.findByEnrollmentNumber(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));

        UserDto dto = new UserDto(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok(dto);
    }
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {

        List<UserDto> users = userRepository.findAll()
                .stream()
                .map(user -> new UserDto(
                        user.getUserId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                ))
                .toList();

        return ResponseEntity.ok(users);
    }
    @PreAuthorize("hasAnyRole('ADMIN','GUIDE')")
    @GetMapping("/students")
    public ResponseEntity<List<UserDto>> getAllStudents() {

        List<UserDto> students = userRepository.findAll()
                .stream()
                .filter(user -> user.getRole().equals("STUDENT")) // ✅ filter
                .map(user -> new UserDto(
                        user.getUserId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                ))
                .toList();

        return ResponseEntity.ok(students);
    }
}