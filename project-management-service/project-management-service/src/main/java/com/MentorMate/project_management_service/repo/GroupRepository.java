package com.MentorMate.project_management_service.repo;


import com.MentorMate.project_management_service.entity.GroupMember;
import com.MentorMate.project_management_service.entity.ProjectGroups;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<ProjectGroups,Long> {
    Optional<ProjectGroups> findById(Long id);
    List<ProjectGroups> findByIdIn(List<Long> groupIds);

}
