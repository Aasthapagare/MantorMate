package com.divya.Progress_Service.dto;

public class ProgressDto {
    private int meetingPercentage;
    private int presentationPercentage;
    private int milestonePercentage;
    private int overallPercentage;

    public int getMeetingPercentage() {
        return meetingPercentage;
    }

    public void setMeetingPercentage(int meetingPercentage) {
        this.meetingPercentage = meetingPercentage;
    }

    public int getPresentationPercentage() {
        return presentationPercentage;
    }

    public void setPresentationPercentage(int presentationPercentage) {
        this.presentationPercentage = presentationPercentage;
    }

    public int getMilestonePercentage() {
        return milestonePercentage;
    }

    public void setMilestonePercentage(int milestonePercentage) {
        this.milestonePercentage = milestonePercentage;
    }

    public int getOverallPercentage() {
        return overallPercentage;
    }

    public void setOverallPercentage(int overallPercentage) {
        this.overallPercentage = overallPercentage;
    }
}
