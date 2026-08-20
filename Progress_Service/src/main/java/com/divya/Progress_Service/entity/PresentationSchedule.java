package com.divya.Progress_Service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class PresentationSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int presentationNumber;

    private String presentationTitle;

    private LocalDate date;

    private String milestoneName;

    private String expectedCompletion;

    private int milestoneWeight;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPresentationNumber() {
        return presentationNumber;
    }

    public void setPresentationNumber(int presentationNumber) {
        this.presentationNumber = presentationNumber;
    }

    public String getPresentationTitle() {
        return presentationTitle;
    }

    public void setPresentationTitle(String presentationTitle) {
        this.presentationTitle = presentationTitle;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
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

    public int getMilestoneWeight() {
        return milestoneWeight;
    }

    public void setMilestoneWeight(int milestoneWeight) {
        this.milestoneWeight = milestoneWeight;
    }
}
