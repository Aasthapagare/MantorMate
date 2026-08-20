package com.MentorMate.Meeting_Doubt.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "meetings")
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String studentEnrollment;
    private String guideIdentifier;
    private Long guideId;
    private String topic;
    private String meetingMode;
    private String meetingLink;
    private LocalDateTime scheduledTime;
    private LocalDateTime requestedAt;

    @Enumerated(EnumType.STRING)
    private MeetingStatus status;

    private String studentName;
    private String remarks;

    public Meeting() {
    }

    public Meeting(
            Long id,
            Long studentId,
            Long guideId,
            String topic,
            String studentName,
            String meetingMode,
            String meetingLink,
            LocalDateTime scheduledTime,
            MeetingStatus status,
            String remarks
    ) {
        this.id = id;
        this.studentId = studentId;
        this.guideId = guideId;
        this.topic = topic;
        this.studentName = studentName;
        this.meetingMode = meetingMode;
        this.meetingLink = meetingLink;
        this.scheduledTime = scheduledTime;
        this.status = status;
        this.remarks = remarks;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentEnrollment() {
        return studentEnrollment;
    }

    public void setStudentEnrollment(String studentEnrollment) {
        this.studentEnrollment = studentEnrollment;
    }

    public String getGuideIdentifier() {
        return guideIdentifier;
    }

    public void setGuideIdentifier(String guideIdentifier) {
        this.guideIdentifier = guideIdentifier;
    }

    public Long getGuideId() {
        return guideId;
    }

    public void setGuideId(Long guideId) {
        this.guideId = guideId;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getMeetingMode() {
        return meetingMode;
    }

    public void setMeetingMode(String meetingMode) {
        this.meetingMode = meetingMode;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public LocalDateTime getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(LocalDateTime scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    public LocalDateTime getRequestedAt() {
        return requestedAt;
    }

    public void setRequestedAt(LocalDateTime requestedAt) {
        this.requestedAt = requestedAt;
    }

    public MeetingStatus getStatus() {
        return status;
    }

    public void setStatus(MeetingStatus status) {
        this.status = status;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
