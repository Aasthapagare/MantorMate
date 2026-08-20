package com.divya.AuthService.dto;

public class AuthResponse {
    private String token;
    private String userId;
    private String name;
    private String role;

    public AuthResponse(String token, String userId, String name, String role) {
        this.token = token;
        this.userId = userId;
        this.name = name;      // ADD THIS
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
