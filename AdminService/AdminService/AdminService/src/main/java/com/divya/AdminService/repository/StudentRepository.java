package com.divya.AdminService.repository;

import com.divya.AdminService.entity.Student;
import com.divya.AdminService.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    boolean existsByRollNo(String rollNo);

    boolean existsByEmail(String email);

    Optional<Student> findByRollNo(String rollNo);

    void deleteByRollNo(String rollNo);
}
