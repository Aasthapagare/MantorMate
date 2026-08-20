package com.MentorMate.project_management_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class GuidePreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long groupId;

    private String guideId;

    private int preferenceOrder;   // 1 or 2

    // Constructors
    public GuidePreference() {
    }

    public GuidePreference(Long groupId, String guideId, int preferenceOrder) {
        this.groupId = groupId;
        this.guideId = guideId;
        this.preferenceOrder = preferenceOrder;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

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

    public int getPreferenceOrder() {
        return preferenceOrder;
    }

    public void setPreferenceOrder(int preferenceOrder) {
        this.preferenceOrder = preferenceOrder;
    }
}
