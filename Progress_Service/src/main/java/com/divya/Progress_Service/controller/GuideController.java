package com.divya.Progress_Service.controller;

import com.divya.Progress_Service.Repository.MeetingRepo;
import com.divya.Progress_Service.Repository.MilestoneRepo;
import com.divya.Progress_Service.Repository.PresentationAttendencRepo;
import com.divya.Progress_Service.Repository.PresentationScheduleRepo;
import com.divya.Progress_Service.Service.GuideAccessService;
import com.divya.Progress_Service.Service.ProgressService;
import com.divya.Progress_Service.dto.GuidePresentationSubmissionRequest;
import com.divya.Progress_Service.dto.ProgressResponse;
import com.divya.Progress_Service.entity.Meeting;
import com.divya.Progress_Service.entity.Milestone;
import com.divya.Progress_Service.entity.PresentationAttendence;
import com.divya.Progress_Service.entity.PresentationSchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/guide")
public class GuideController {
    @Autowired
    private PresentationAttendencRepo attendanceRepo;

    @Autowired
    private MilestoneRepo milestoneRepo;

    @Autowired
    private MeetingRepo meetingRepo;

    @Autowired
    private ProgressService progressService;

    @Autowired
    private PresentationScheduleRepo presentationScheduleRepo;

    @Autowired
    private GuideAccessService guideAccessService;

    @PostMapping("/presentation/submit")
    public ResponseEntity<?> submitPresentation(
            @RequestBody GuidePresentationSubmissionRequest request){
        progressService.submitPresentationEntries(request);
        return ResponseEntity.ok("Presentation marked");
    }

    @PostMapping("/presentation/mark")
    public ResponseEntity<?> markPresentationBulk(
            @RequestBody List<PresentationAttendence> attendances){
        guideAccessService.validateStudentAccess(
                attendances.stream()
                        .map(PresentationAttendence::getStudentId)
                        .collect(Collectors.toList())
        );

        for(PresentationAttendence attendance : attendances){
            PresentationAttendence existing =
                    attendanceRepo.findByStudentIdAndPresentationId(
                            attendance.getStudentId(),
                            attendance.getPresentationId()
                    );

            if(existing != null){
                existing.setAttended(attendance.isAttended());
                existing.setRating(attendance.getRating());
                existing.setProgress(attendance.isAttended() ? 100 : 0);
                existing.setWeight(attendance.getWeight());
                existing.setNotes(attendance.getNotes());
                attendanceRepo.save(existing);
            } else {
                attendance.setProgress(attendance.isAttended() ? 100 : 0);
                attendance.setWeight(attendance.getWeight());
                attendanceRepo.save(attendance);
            }
        }

        return ResponseEntity.ok("Presentation marked");
    }

    @PostMapping("/milestone/complete")
    public ResponseEntity<?> completeMilestone(@RequestBody Milestone milestone){
        guideAccessService.validateStudentAccess(milestone.getStudentId());

        if(milestone.getMilestoneName() == null){
            return ResponseEntity.badRequest().body("Milestone name missing");
        }

        Milestone existing = milestoneRepo.findByStudentId(milestone.getStudentId())
                .stream()
                .filter(m -> milestone.getMilestoneName().equals(m.getMilestoneName()))
                .findFirst()
                .orElse(null);

        if(existing != null){
            existing.setWeightage(milestone.getWeightage());
            existing.setWeight(milestone.getWeightage());
            existing.setCompleted(true);
            milestoneRepo.save(existing);
        } else {
            milestone.setCompleted(true);
            milestone.setWeight(milestone.getWeightage());
            milestoneRepo.save(milestone);
        }

        return ResponseEntity.ok("Milestone updated");
    }

    @PostMapping("/meeting")
    public ResponseEntity<?> markMeeting(@RequestBody Meeting meeting, Authentication authentication){
        guideAccessService.validateStudentAccess(meeting.getStudentId());

        Meeting existing =
                meetingRepo.findByStudentIdAndMeetingDate(meeting.getStudentId(), meeting.getMeetingDate());

        if(existing != null){
            existing.setGuideId(authentication.getName());
            existing.setMode(meeting.getMode());
            existing.setNotes(meeting.getNotes());
            existing.setAttended(true);
            meetingRepo.save(existing);
        } else {
            meeting.setGuideId(authentication.getName());
            meeting.setAttended(true);
            meetingRepo.save(meeting);
        }

        return ResponseEntity.ok("Meeting attendance marked");
    }

    @GetMapping("/presentation/{presentationId}")
    public List<PresentationAttendence> getAttendance(@PathVariable long presentationId){
        return progressService.getGuideAttendance(presentationId);
    }

    @GetMapping("/milestone/{presentationId}")
    public List<Milestone> getMilestones(@PathVariable long presentationId){
        return progressService.getGuideMilestones(presentationId);
    }

    @GetMapping("/presentation-schedules")
    public List<PresentationSchedule> getPresentationSchedules(){
        return presentationScheduleRepo.findAllByOrderByDateAsc();
    }

    @GetMapping("/student-progress/{studentId}")
    public ResponseEntity<ProgressResponse> getStudentProgress(@PathVariable String studentId) {
        return ResponseEntity.ok(progressService.calculateProgressForGuide(studentId));
    }
}
