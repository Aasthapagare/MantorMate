package com.divya.AuthService.controller;

import com.divya.AuthService.dto.AuthResponse;
import com.divya.AuthService.dto.LoginRequest;
import com.divya.AuthService.dto.RegisterRequest;
import com.divya.AuthService.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        AuthResponse response = service.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response = service.login(request);
        return ResponseEntity.ok(response);
    }
}