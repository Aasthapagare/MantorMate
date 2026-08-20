package com.MentorMate.project_management_service.repo;

import com.MentorMate.project_management_service.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember,Long> {
    boolean existsByUserId(String userId);

    long countByGroupId(Long groupId);

    List<GroupMember> findByGroupId(Long groupId);
    Optional<GroupMember> findByUserId(String userId);
    Optional<GroupMember> findByGroupIdAndUserId(Long groupId, String userId);
    void deleteByGroupIdAndUserId(Long groupId, String userId);
}

