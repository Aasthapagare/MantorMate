package com.MentorMate.project_management_service.repo;

import com.MentorMate.project_management_service.entity.GuidePreference;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuidePreferenceRepository extends JpaRepository<GuidePreference,Long> {
    List<GuidePreference> findByGroupId(Long groupId);

    void deleteByGroupId(Long groupId);
}
