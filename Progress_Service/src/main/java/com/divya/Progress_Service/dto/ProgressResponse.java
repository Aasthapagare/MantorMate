package com.divya.Progress_Service.dto;

public class ProgressResponse {
    private double meetings;
    private double presentations;
    private double milestones;
    private double overall;

    public ProgressResponse(double meetings, double presentations, double milestones, double overall) {
        this.meetings = meetings;
        this.presentations = presentations;
        this.milestones = milestones;
        this.overall = overall;
    }

    public double getMeetings() { return meetings; }
    public double getPresentations() { return presentations; }
    public double getMilestones() { return milestones; }
    public double getOverall() { return overall; }
}
