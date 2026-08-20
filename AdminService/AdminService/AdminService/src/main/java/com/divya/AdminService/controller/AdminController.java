package com.divya.AdminService.controller;

import com.divya.AdminService.DTO.AdminDashboardDto;
import com.divya.AdminService.DTO.AdminGroupAllocationDto;
import com.divya.AdminService.DTO.AllocateGuideRequest;
import com.divya.AdminService.DTO.FileUploadResponse;
import com.divya.AdminService.DTO.UserDto;
import com.divya.AdminService.service.AdminService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/dashboard")
    public AdminDashboardDto getDashboard(@RequestHeader(value = "Authorization", required = false) String token) {
        return adminService.getDashboard(token);
    }

    @GetMapping("/students")
    public List<UserDto> getStudents(@RequestHeader(value = "Authorization", required = false) String token) {
        return adminService.getStudents(token);
    }

    @GetMapping("/faculty")
    public List<UserDto> getFaculty(@RequestHeader(value = "Authorization", required = false) String token) {
        return adminService.getFaculty(token);
    }

    @DeleteMapping("/students/{id}")
    public void deleteStudent(@PathVariable String id,
                              @RequestHeader(value = "Authorization", required = false) String token) {
        adminService.deleteUser(id, token);
    }

    @DeleteMapping("/faculty/{id}")
    public void deleteFaculty(@PathVariable String id,
                              @RequestHeader(value = "Authorization", required = false) String token) {
        adminService.deleteUser(id, token);
    }

    @GetMapping("/group-guide-allocations")
    public List<AdminGroupAllocationDto> getGroupGuideAllocations(
            @RequestHeader(value = "Authorization", required = false) String token) {
        return adminService.getGroupGuideAllocations(token);
    }

    @PostMapping("/allocate-guide")
    public String allocateGuide(@RequestBody AllocateGuideRequest request,
                                @RequestHeader(value = "Authorization", required = false) String token) {
        return adminService.allocateGuide(request, token);
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public FileUploadResponse upload(@RequestParam("file") MultipartFile file) {
        return adminService.upload(file);
    }
}
