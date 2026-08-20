package com.divya.AuthService.service;

import com.divya.AuthService.dto.UserDto;
import com.divya.AuthService.entity.User;
import com.divya.AuthService.repo.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDto(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}