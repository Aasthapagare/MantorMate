package com.MentorMate.Meeting_Doubt.repository;

import com.MentorMate.Meeting_Doubt.entity.Meeting;
import com.MentorMate.Meeting_Doubt.entity.MeetingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    // Find meetings by guide id
    List<Meeting> findByGuideId(Long guideId);

    // Find meetings by student id
    List<Meeting> findByStudentId(Long studentId);

    // Find meetings by status (PENDING, APPROVED, REJECTED)
    List<Meeting> findByStatus(String status);

    List<Meeting> findByGuideIdAndStatus(Long guideId, MeetingStatus status);
    List<Meeting> findByStudentIdAndStatus(Long studentId, MeetingStatus status);
}