package com.divya.AuthService.service;

import com.divya.AuthService.config.JwtUtil;
import com.divya.AuthService.dto.AuthResponse;
import com.divya.AuthService.dto.LoginRequest;
import com.divya.AuthService.dto.RegisterRequest;
import com.divya.AuthService.entity.User;
import com.divya.AuthService.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository repository,
                       PasswordEncoder encoder,
                       JwtUtil jwtUtil) {
        this.repository = repository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {

        // Check if email already exists
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEnrollmentNumber(request.getEnrollmentNumber());
        user.setUserId(request.getEnrollmentNumber());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));

        // ALWAYS STUDENT
        user.setRole("STUDENT");

        User savedUser = repository.save(user);

        String token = jwtUtil.generateToken(
                savedUser.getUserId(),
                savedUser.getRole()
        );

        return new AuthResponse(
                token,
                savedUser.getUserId(),
                savedUser.getName(),
                savedUser.getRole()
        );
    }

    public AuthResponse login(LoginRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(
                user.getUserId(),
                user.getRole()
        );

        return new AuthResponse(
                token,
                user.getUserId(),
                user.getName(),
                user.getRole()
        );
    }
}