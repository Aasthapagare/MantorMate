package com.divya.Progress_Service.Service;

import com.divya.Progress_Service.Repository.MeetingRepo;
import com.divya.Progress_Service.Repository.MilestoneRepo;
import com.divya.Progress_Service.Repository.PresentationAttendencRepo;
import com.divya.Progress_Service.Repository.PresentationScheduleRepo;
import com.divya.Progress_Service.dto.GuidePresentationEntryRequest;
import com.divya.Progress_Service.dto.GuidePresentationSubmissionRequest;
import com.divya.Progress_Service.dto.ProgressDto;
import com.divya.Progress_Service.dto.ProgressResponse;
import com.divya.Progress_Service.entity.Meeting;
import com.divya.Progress_Service.entity.Milestone;
import com.divya.Progress_Service.entity.PresentationAttendence;
import com.divya.Progress_Service.entity.PresentationSchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProgressService {
    @Autowired
    private MeetingRepo meetingRepo;

    @Autowired
    private PresentationAttendencRepo presentationAttendencRepo;
    @Autowired
    private PresentationScheduleRepo presentationScheduleRepo;

    @Autowired
    private MilestoneRepo milestoneRepo;

    @Autowired
    private GuideAccessService guideAccessService;

    public void submitPresentationEntries(GuidePresentationSubmissionRequest request){
        PresentationSchedule schedule = presentationScheduleRepo.findById(request.getPresentationId())
                .orElseThrow(() -> new RuntimeException("Presentation schedule not found"));

        if(request.getEntries() == null || request.getEntries().isEmpty()){
            throw new RuntimeException("No presentation entries provided");
        }

        guideAccessService.validateStudentAccess(
                request.getEntries().stream()
                        .map(GuidePresentationEntryRequest::getStudentId)
                        .collect(Collectors.toList())
        );

        for(GuidePresentationEntryRequest entry : request.getEntries()){
            if(entry.getStudentId() == null || entry.getStudentId().isBlank()){
                continue;
            }

            savePresentationAttendance(request.getPresentationId(), entry);
            saveMilestone(schedule, entry);
        }
    }

    private void savePresentationAttendance(Long presentationId, GuidePresentationEntryRequest entry){
        PresentationAttendence attendance =
                presentationAttendencRepo.findByStudentIdAndPresentationId(entry.getStudentId(), presentationId);

        if(attendance == null){
            attendance = new PresentationAttendence();
            attendance.setStudentId(entry.getStudentId());
            attendance.setPresentationId(presentationId);
        }

        attendance.setAttended(entry.isAttended());
        attendance.setRating(entry.getRating() == null ? 0 : entry.getRating());
        attendance.setProgress(entry.isAttended() ? 100 : 0);
        attendance.setWeight(resolveWeightage(scheduleFromPresentationId(presentationId), entry));
        attendance.setNotes(entry.getNotes());

        presentationAttendencRepo.save(attendance);
    }

    private void saveMilestone(PresentationSchedule schedule, GuidePresentationEntryRequest entry){
        Milestone milestone =
                milestoneRepo.findByStudentIdAndPresentationId(entry.getStudentId(), schedule.getId());

        if(milestone == null){
            milestone = new Milestone();
            milestone.setStudentId(entry.getStudentId());
            milestone.setPresentationId(schedule.getId());
            milestone.setMilestoneName(schedule.getMilestoneName());
        }

        milestone.setCompleted(entry.isMilestoneCompleted());
        int resolvedWeight = resolveWeightage(schedule, entry);
        milestone.setWeightage(resolvedWeight);
        milestone.setWeight(resolvedWeight);

        milestoneRepo.save(milestone);
    }

    private PresentationSchedule scheduleFromPresentationId(Long presentationId) {
        return presentationScheduleRepo.findById(presentationId)
                .orElseThrow(() -> new RuntimeException("Presentation schedule not found"));
    }

    private int resolveWeightage(PresentationSchedule schedule, GuidePresentationEntryRequest entry){
        if(!entry.isMilestoneCompleted()){
            return 0;
        }

        Integer submittedWeight = entry.getWeightage();
        if(submittedWeight == null){
            return schedule.getMilestoneWeight();
        }

        return Math.max(0, Math.min(submittedWeight, schedule.getMilestoneWeight()));
    }

    public ProgressResponse calculateProgress(String studentId){
        return calculateProgress(studentId, false);
    }

    public ProgressResponse calculateProgressForGuide(String studentId){
        return calculateProgress(studentId, true);
    }

    private ProgressResponse calculateProgress(String studentId, boolean validateGuideAccess){
        if (validateGuideAccess) {
            guideAccessService.validateStudentAccess(studentId);
        }

        // Meeting Progress
        List<Meeting> meetings = meetingRepo.findByStudentId(studentId);

        long attendedMeetings =
                meetings.stream()
                        .filter(Meeting::isAttended)
                        .count();

        int totalPresentation =
                presentationScheduleRepo.findAll().size();

        double meetingPercent =
                totalPresentation==0?0:
                        (double)attendedMeetings/totalPresentation*100;
        // Presentation Progress
        int totalPresentations =
                presentationScheduleRepo.findAll().size();

        List<PresentationAttendence> presentations =
                presentationAttendencRepo.findByStudentId(studentId);

        long attendedPresent =
                presentations.stream()
                        .filter(PresentationAttendence::isAttended)
                        .count();

        double presentationPercent =
                totalPresentations==0?0:(double)attendedPresent/totalPresentations*100;
        // Milestone Progress
        List<PresentationSchedule> schedules =
                presentationScheduleRepo.findAll();

        List<Milestone> completed =
                milestoneRepo.findByStudentId(studentId);

        int totalWeight =
                schedules.stream()
                        .mapToInt(PresentationSchedule::getMilestoneWeight)
                        .sum();

        int earnedWeight =
                completed.stream()
                        .mapToInt(Milestone::getWeightage)
                        .sum();

        double milestonePercent =
                totalWeight==0?0:(double)earnedWeight/totalWeight*100;


        // Rating
        double ratingPercent =
                presentations.stream()
                        .mapToInt(PresentationAttendence::getRating)
                        .average()
                        .orElse(0)/5*100;

        double overall =
                (meetingPercent*0.2)
                        +(presentationPercent*0.3)
                        +(milestonePercent*0.4)
                        +(ratingPercent*0.1);

        overall = Math.min(overall,100);

        return new ProgressResponse(
                meetingPercent,
                presentationPercent,
                milestonePercent,
                overall
        );
    }

    public List<PresentationAttendence> getGuideAttendance(long presentationId) {
        Set<String> assignedStudentIds = guideAccessService.getAssignedStudentIds();
        return presentationAttendencRepo.findByPresentationId(presentationId)
                .stream()
                .filter(attendance -> assignedStudentIds.contains(attendance.getStudentId()))
                .toList();
    }

    public List<Milestone> getGuideMilestones(long presentationId) {
        Set<String> assignedStudentIds = guideAccessService.getAssignedStudentIds();
        return milestoneRepo.findByPresentationId(presentationId)
                .stream()
                .filter(milestone -> assignedStudentIds.contains(milestone.getStudentId()))
                .toList();
    }
}
