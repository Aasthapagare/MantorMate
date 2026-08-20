package com.divya.Progress_Service.Repository;

import com.divya.Progress_Service.entity.PresentationAttendence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PresentationAttendencRepo extends JpaRepository<PresentationAttendence,Long> {
    List<PresentationAttendence> findByStudentId(String studentId);

    PresentationAttendence findByStudentIdAndPresentationId(String studentId, Long presentationId);

    List<PresentationAttendence> findByPresentationId(long presentationId);
}
