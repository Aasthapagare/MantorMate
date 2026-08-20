package com.MentorMate.project_management_service.repo;

import com.MentorMate.project_management_service.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document,Long> {
    List<Document> findByGroupId(Long groupId);
    Optional<Document> findByIdAndGroupId(Long id, Long groupId);
}
