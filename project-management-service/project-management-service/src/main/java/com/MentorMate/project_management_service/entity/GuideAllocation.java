package com.MentorMate.project_management_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class GuideAllocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long groupId;

    private String guideId;

    private String allocatedBy;   // admin id

    // Constructors
    public GuideAllocation() {
    }

    public GuideAllocation(Long groupId, String guideId, String allocatedBy) {
        this.groupId = groupId;
        this.guideId = guideId;
        this.allocatedBy = allocatedBy;
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

    public String getAllocatedBy() {
        return allocatedBy;
    }

    public void setAllocatedBy(String allocatedBy) {
        this.allocatedBy = allocatedBy;
    }
}
