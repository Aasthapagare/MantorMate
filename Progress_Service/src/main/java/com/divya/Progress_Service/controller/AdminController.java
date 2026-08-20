package com.divya.Progress_Service.controller;

import com.divya.Progress_Service.Repository.PresentationScheduleRepo;
import com.divya.Progress_Service.entity.PresentationSchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private PresentationScheduleRepo scheduleRepo;

    @GetMapping("/presentation")
    public List<PresentationSchedule> getPresentations() {
        return scheduleRepo.findAllByOrderByDateAsc();
    }

    @PostMapping("/presentation")
    public ResponseEntity<?> createPresentation(
            @RequestBody PresentationSchedule schedule) {

        scheduleRepo.save(schedule);

        return ResponseEntity.ok("Presentation schedule added");
    }

    @DeleteMapping("/presentation/{id}")
    public ResponseEntity<?> deletePresentation(@PathVariable Long id) {
        scheduleRepo.deleteById(id);
        return ResponseEntity.ok("Presentation schedule deleted");
    }

    @GetMapping("/presentation/date/{date}")
    public List<PresentationSchedule> getByDate(@PathVariable String date){
        return scheduleRepo.findAll()
                .stream()
                .filter(s -> s.getDate().toString().equals(date))
                .toList();
    }
}
