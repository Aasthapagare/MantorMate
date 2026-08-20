package com.MentorMate.project_management_service.repo;

import com.MentorMate.project_management_service.entity.GuideAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface GuideAllocationRepository extends JpaRepository<GuideAllocation,Long> {
    List<GuideAllocation> findByGuideId(String guideId);

    GuideAllocation findByGroupId(Long groupId);

    List<String> findMembersByGroupId(Long id);
}
