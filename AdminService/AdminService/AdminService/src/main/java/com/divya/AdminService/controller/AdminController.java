package com.divya.AdminService.controller;

import com.divya.AdminService.entity.Student;
import com.divya.AdminService.entity.Teacher;
import com.divya.AdminService.service.StudentService;
import com.divya.AdminService.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private TeacherService teacherService;
    @PostMapping("/upload/students")
    public ResponseEntity<?> uploadStudents(@RequestParam MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        if (!file.getOriginalFilename().endsWith(".csv")) {
            return ResponseEntity.badRequest().body("Only CSV files are allowed");
        }
        studentService.uploadStudents(file);
        return ResponseEntity.ok("Students uploaded successfully");
    }

    @PostMapping("/upload/teachers")
    public ResponseEntity<?> uploadTeachers(@RequestParam MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        if (!file.getOriginalFilename().endsWith(".csv")) {
            return ResponseEntity.badRequest().body("Only CSV files are allowed");
        }
        teacherService.uploadTeachers(file);
        return ResponseEntity.ok("Teachers uploaded successfully");
    }
    @GetMapping("/student")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }
    @GetMapping("/teacher")
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        return ResponseEntity.ok(teacherService.getAllTeachers());
    }
    @DeleteMapping("/student/{rollNo}")
    public ResponseEntity<String> deleteStudent(
            @PathVariable String rollNo) {

        studentService.deleteStudent(rollNo);
        return ResponseEntity.ok("Student deleted successfully");
    }

    @DeleteMapping("/teacher/{employeeId}")
    public ResponseEntity<String> deleteTeacher(
            @PathVariable String employeeId) {

        teacherService.deleteTeacher(employeeId);
        return ResponseEntity.ok("Teacher deleted successfully");
    }


}
