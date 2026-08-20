package com.MentorMate.project_management_service.dto;

public class PresentationScheduleRequest {
    private String presentationNo;
    private String presentationTitle;
    private String date;
    private String milestoneName;
    private String expectedCompletion;
    private String milestoneWeight;

    public String getPresentationNo() {
        return presentationNo;
    }

    public void setPresentationNo(String presentationNo) {
        this.presentationNo = presentationNo;
    }

    public String getPresentationTitle() {
        return presentationTitle;
    }

    public void setPresentationTitle(String presentationTitle) {
        this.presentationTitle = presentationTitle;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getMilestoneName() {
        return milestoneName;
    }

    public void setMilestoneName(String milestoneName) {
        this.milestoneName = milestoneName;
    }

    public String getExpectedCompletion() {
        return expectedCompletion;
    }

    public void setExpectedCompletion(String expectedCompletion) {
        this.expectedCompletion = expectedCompletion;
    }

    public String getMilestoneWeight() {
        return milestoneWeight;
    }

    public void setMilestoneWeight(String milestoneWeight) {
        this.milestoneWeight = milestoneWeight;
    }
}
