package com.MentorMate.project_management_service.dto;

public class GuideOptionDto {
    private String guideId;
    private String guideName;
    private int preferenceOrder;

    public String getGuideId() {
        return guideId;
    }

    public void setGuideId(String guideId) {
        this.guideId = guideId;
    }

    public String getGuideName() {
        return guideName;
    }

    public void setGuideName(String guideName) {
        this.guideName = guideName;
    }

    public int getPreferenceOrder() {
        return preferenceOrder;
    }

    public void setPreferenceOrder(int preferenceOrder) {
        this.preferenceOrder = preferenceOrder;
    }
}
