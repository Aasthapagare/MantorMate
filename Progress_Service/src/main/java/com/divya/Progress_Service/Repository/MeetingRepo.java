package com.divya.Progress_Service.Repository;

import com.divya.Progress_Service.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MeetingRepo extends JpaRepository<Meeting,Long> {
    List<Meeting> findByStudentId(String studentId);
    Meeting findByStudentIdAndMeetingDate(String studentId, LocalDate meetingDate);
}
