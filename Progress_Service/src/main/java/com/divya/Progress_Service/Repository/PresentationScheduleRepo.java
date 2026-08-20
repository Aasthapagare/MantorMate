package com.divya.Progress_Service.Repository;

import com.divya.Progress_Service.entity.PresentationSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PresentationScheduleRepo extends JpaRepository<PresentationSchedule,Long> {
    List<PresentationSchedule> findAllByOrderByDateAsc();
}
