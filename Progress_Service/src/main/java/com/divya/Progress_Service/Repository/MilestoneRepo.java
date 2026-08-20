package com.divya.Progress_Service.Repository;

import com.divya.Progress_Service.entity.Meeting;
import com.divya.Progress_Service.entity.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MilestoneRepo extends JpaRepository<Milestone,Long> {
    List<Milestone> findByStudentId(String studentId);
    List<Milestone> findAll();

    Milestone findByStudentIdAndMilestoneName(String studentId, String milestoneName);

    List<Milestone> findByPresentationId(long presentationId);

    Milestone findByStudentIdAndPresentationId(String studentId, Long id);
}
