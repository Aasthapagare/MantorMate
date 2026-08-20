package com.MentorMate.project_management_service.dto;

import java.util.List;

public class GuideSelectionRequest {
    private List<String> guideIds;

    public List<String> getGuideIds() {
        return guideIds;
    }

    public void setGuideIds(List<String> guideIds) {
        this.guideIds = guideIds;
    }
}
