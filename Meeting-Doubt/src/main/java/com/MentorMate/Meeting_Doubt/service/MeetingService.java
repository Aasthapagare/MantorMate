package com.MentorMate.Meeting_Doubt.service;

import com.MentorMate.Meeting_Doubt.client.NotificationClient;
import com.MentorMate.Meeting_Doubt.dto.NotificationDTO;
import com.MentorMate.Meeting_Doubt.entity.Meeting;
import com.MentorMate.Meeting_Doubt.entity.MeetingStatus;
import com.MentorMate.Meeting_Doubt.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private NotificationClient notificationClient;

    public Meeting createMeetingRequest(Meeting meeting) {
        meeting.setStatus(MeetingStatus.PENDING);
        meeting.setRequestedAt(LocalDateTime.now());
        Meeting savedMeeting = meetingRepository.save(meeting);
        sendMeetingRequestNotification(savedMeeting);
        return savedMeeting;
    }

    public Meeting approveMeeting(Long meetingId, String scheduledTime) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));

        if (meeting.getStatus() != MeetingStatus.PENDING) {
            throw new RuntimeException("Meeting already processed");
        }

        LocalDateTime dateTime = LocalDateTime.parse(scheduledTime);

        if (dateTime.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Scheduled time must be in future");
        }

        meeting.setScheduledTime(dateTime);

        String uniqueRoom = "mentorMate-" +
                meeting.getStudentId() + "-" +
                meeting.getGuideId() + "-" +
                UUID.randomUUID().toString().substring(0, 8);

        meeting.setMeetingLink("https://meet.jit.si/" + uniqueRoom);
        meeting.setStatus(MeetingStatus.APPROVED);

        Meeting savedMeeting = meetingRepository.save(meeting);
        sendMeetingApprovedNotification(savedMeeting);
        return savedMeeting;
    }

    public List<Meeting> getPendingMeetingsForGuide(Long guideId) {
        return meetingRepository.findByGuideIdAndStatus(
                guideId,
                MeetingStatus.PENDING
        );
    }

    public Meeting rejectMeeting(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));

        meeting.setStatus(MeetingStatus.REJECTED);

        return meetingRepository.save(meeting);
    }

    public List<Meeting> getApprovedMeetingsForStudent(Long studentId) {
        return meetingRepository.findByStudentIdAndStatus(
                studentId,
                MeetingStatus.APPROVED
        );
    }

    public List<Meeting> getStudentMeetings(Long studentId) {
        return meetingRepository.findByStudentId(studentId);
    }

    public List<Meeting> getGuideMeetings(Long guideId) {
        return meetingRepository.findByGuideId(guideId);
    }

    public Meeting completeMeeting(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));

        meeting.setStatus(MeetingStatus.COMPLETED);

        return meetingRepository.save(meeting);
    }

    public List<Meeting> getAllMeetingsForStudent(Long studentId) {
        return meetingRepository.findByStudentId(studentId);
    }

    public Meeting cancelMeeting(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));

        if (meeting.getStatus() == MeetingStatus.APPROVED) {
            throw new RuntimeException("Cannot cancel approved meeting");
        }

        meeting.setStatus(MeetingStatus.REJECTED);

        return meetingRepository.save(meeting);
    }

    public Meeting getMeetingById(Long meetingId) {
        return meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));
    }

    private void sendMeetingRequestNotification(Meeting meeting) {
        String guideReceiver = !isBlank(meeting.getGuideIdentifier())
                ? meeting.getGuideIdentifier().trim()
                : (meeting.getGuideId() == null ? null : String.valueOf(meeting.getGuideId()));

        if (isBlank(guideReceiver)) {
            return;
        }

        String studentLabel = isBlank(meeting.getStudentName())
                ? fallbackStudentLabel(meeting)
                : meeting.getStudentName().trim();
        String topicLabel = isBlank(meeting.getTopic()) ? "a new topic" : meeting.getTopic().trim();

        try {
            notificationClient.sendNotification(
                    new NotificationDTO(
                            guideReceiver,
                            studentLabel + " requested a meeting for " + topicLabel + ".",
                            "MEETING_REQUEST"
                    )
            );
        } catch (Exception exception) {
            System.err.println("Meeting request notification failed for meeting " + meeting.getId());
        }
    }

    private void sendMeetingApprovedNotification(Meeting meeting) {
        if (isBlank(meeting.getStudentEnrollment()) || meeting.getScheduledTime() == null) {
            return;
        }

        String guideLabel = meeting.getGuideId() == null ? "your guide" : "Guide " + meeting.getGuideId();
        String formattedTime = meeting.getScheduledTime()
                .format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a"));
        String topicLabel = isBlank(meeting.getTopic()) ? "your meeting request" : meeting.getTopic().trim();

        try {
            notificationClient.sendNotification(
                    new NotificationDTO(
                            meeting.getStudentEnrollment().trim(),
                            guideLabel + " approved " + topicLabel + " for " + formattedTime + ".",
                            "MEETING_APPROVED"
                    )
            );
        } catch (Exception exception) {
            System.err.println("Meeting approval notification failed for meeting " + meeting.getId());
        }
    }

    private String fallbackStudentLabel(Meeting meeting) {
        if (!isBlank(meeting.getStudentEnrollment())) {
            return meeting.getStudentEnrollment().trim();
        }
        if (meeting.getStudentId() != null) {
            return "Student " + meeting.getStudentId();
        }
        return "A student";
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
