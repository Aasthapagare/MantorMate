package com.MentorMate.Video_call_service.service;

import com.MentorMate.Video_call_service.entity.Meeting;
import com.MentorMate.Video_call_service.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    // Student request
    public Meeting requestMeeting(Meeting meeting) {
        meeting.setStatus("PENDING");
        return meetingRepository.save(meeting);
    }

    // Guide schedule meeting
    public Meeting scheduleMeeting(Long meetingId, LocalDateTime time) {

        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow();

        meeting.setScheduledTime(time);
        meeting.setStatus("SCHEDULED");

        // Jitsi meeting link generate
        String room = "mentorMate-" + UUID.randomUUID();
        meeting.setMeetingLink("https://meet.jit.si/" + room);

        return meetingRepository.save(meeting);
    }
}

