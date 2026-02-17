package com.divya.AuthService.dto;

public class OAuthRequest {
    private String token;    // For Google
    private String code;     // For GitHub and LinkedIn

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
