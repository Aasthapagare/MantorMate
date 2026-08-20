package com.divya.Progress_Service.controller;
import com.divya.Progress_Service.Repository.MilestoneRepo;
import com.divya.Progress_Service.Repository.PresentationScheduleRepo;
import com.divya.Progress_Service.Service.ProgressService;

import com.divya.Progress_Service.dto.ProgressResponse;
import com.divya.Progress_Service.entity.Milestone;
import com.divya.Progress_Service.entity.PresentationSchedule;
import com.divya.Progress_Service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/student/progress")
public class ProgressController {
    @Autowired
    private ProgressService progressService;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private MilestoneRepo milestoneRepo;
    @Autowired
    private PresentationScheduleRepo presentationScheduleRepo;

    @GetMapping("/progress")
    public ResponseEntity<ProgressResponse> getProgress(
            @RequestHeader("Authorization") String token){

        String studentId = jwtUtil.extractUserId(token);

        ProgressResponse progress =
                progressService.calculateProgress(studentId);

        return ResponseEntity.ok(progress);
    }


    @GetMapping("/milestones")
    public ResponseEntity<?> getMilestones(
            @RequestHeader("Authorization") String token){

        String studentId = jwtUtil.extractUserId(token);

        List<PresentationSchedule> schedules =
                presentationScheduleRepo.findAll();

        List<Milestone> completed =
                milestoneRepo.findByStudentId(studentId);

        List<Map<String,Object>> result = new ArrayList<>();

        for(PresentationSchedule s : schedules){

            Optional<Milestone> m =
                    completed.stream()
                            .filter(c -> c.getMilestoneName()
                                    .equalsIgnoreCase(s.getMilestoneName()))
                            .findFirst();

            Map<String,Object> row = new HashMap<>();

            row.put("name", s.getMilestoneName());

            if(m.isPresent()){

                int givenWeight = m.get().getWeightage();
                int totalWeight = s.getMilestoneWeight();

                double percent =
                        ((double)givenWeight/totalWeight)*100;

                row.put("status","Completed");
                row.put("progress", percent);

            }else{

                row.put("status","Pending");
                row.put("progress",0);

            }

            result.add(row);
        }

        return ResponseEntity.ok(result);
    }
}
