package com.MentorMate.project_management_service.repo;

import com.MentorMate.project_management_service.entity.PresentationSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PresentationScheduleRepository extends JpaRepository<PresentationSchedule, Long> {
}
