package com.divya.AuthService.service;

import com.divya.AuthService.config.JwtUtil;
import com.divya.AuthService.dto.AuthResponse;
import com.divya.AuthService.dto.LoginRequest;
import com.divya.AuthService.dto.RegisterRequest;
import com.divya.AuthService.entity.User;
import com.divya.AuthService.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JwtUtil jwtUtil;

    public void register(RegisterRequest request) {

        User user = new User();
        user.setUserId(request.getUserId());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        // Default role assigned by backend - not from frontend
        user.setRole("student");

        repository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        User user = repository.findByUserId(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getUserId(), user.getRole());

        return new AuthResponse(token, user.getUserId(), user.getRole());
    }
}
