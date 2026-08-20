package com.MentorMate.project_management_service.dto;

public class AllocateGuideRequest {
    private Long groupId;
    private String guideId;

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public String getGuideId() {
        return guideId;
    }

    public void setGuideId(String guideId) {
        this.guideId = guideId;
    }
}
