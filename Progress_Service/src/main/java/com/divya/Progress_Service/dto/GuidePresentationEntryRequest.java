package com.divya.Progress_Service.dto;

public class GuidePresentationEntryRequest {
    private String studentId;
    private boolean attended;
    private boolean milestoneCompleted;
    private Integer weightage;
    private String notes;
    private Integer rating;

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public boolean isAttended() {
        return attended;
    }

    public void setAttended(boolean attended) {
        this.attended = attended;
    }

    public boolean isMilestoneCompleted() {
        return milestoneCompleted;
    }

    public void setMilestoneCompleted(boolean milestoneCompleted) {
        this.milestoneCompleted = milestoneCompleted;
    }

    public Integer getWeightage() {
        return weightage;
    }

    public void setWeightage(Integer weightage) {
        this.weightage = weightage;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
