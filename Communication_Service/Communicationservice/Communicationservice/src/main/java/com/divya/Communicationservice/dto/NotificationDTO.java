package com.divya.Communicationservice.dto;
public class NotificationDTO {
    private String userId;
    private String message;
    private String type;
    public NotificationDTO(String userId, String message, String type) {
        this.userId = userId;
        this.message = message;
        this.type = type;
    }

    public NotificationDTO() {}


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

