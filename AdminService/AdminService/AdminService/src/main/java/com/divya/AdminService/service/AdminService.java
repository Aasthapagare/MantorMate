package com.divya.AdminService.service;

import com.divya.AdminService.client.AuthClient;
import com.divya.AdminService.client.ProjectManagementClient;
import com.divya.AdminService.DTO.AdminDashboardDto;
import com.divya.AdminService.DTO.AdminGroupAllocationDto;
import com.divya.AdminService.DTO.AllocateGuideRequest;
import com.divya.AdminService.DTO.FileUploadResponse;
import com.divya.AdminService.DTO.UserDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Locale;

@Service
public class AdminService {
    private final AuthClient authClient;
    private final ProjectManagementClient projectManagementClient;

    public AdminService(AuthClient authClient, ProjectManagementClient projectManagementClient) {
        this.authClient = authClient;
        this.projectManagementClient = projectManagementClient;
    }

    public AdminDashboardDto getDashboard(String token) {
        List<UserDto> students = getStudents(token);
        List<UserDto> faculty = getFaculty(token);
        List<AdminGroupAllocationDto> allocations = getGroupGuideAllocations(token);
        long pendingAllocations = allocations.stream()
                .filter(allocation -> allocation.getStatus() == null
                        || allocation.getStatus().toLowerCase(Locale.ROOT).contains("pending"))
                .count();
        return new AdminDashboardDto(students.size(), faculty.size(), allocations.size(), pendingAllocations);
    }

    public List<UserDto> getStudents(String token) {
        return safeList(() -> authClient.getStudents(token)).stream()
                .filter(user -> hasRole(user, "STUDENT"))
                .toList();
    }

    public List<UserDto> getFaculty(String token) {
        return safeList(() -> authClient.getGuides(token)).stream()
                .filter(user -> hasRole(user, "GUIDE") || hasRole(user, "FACULTY"))
                .toList();
    }

    public void deleteUser(String id, String token) {
        authClient.deleteUser(id, token);
    }

    public List<AdminGroupAllocationDto> getGroupGuideAllocations(String token) {
        return safeList(() -> projectManagementClient.getGroupGuideAllocations(token));
    }

    public String allocateGuide(AllocateGuideRequest request, String token) {
        return projectManagementClient.allocateGuide(request, token);
    }

    public FileUploadResponse upload(MultipartFile file) {
        return new FileUploadResponse(file.getOriginalFilename(), file.getSize(), "File received successfully");
    }

    private boolean hasRole(UserDto user, String role) {
        return user != null && user.getRole() != null && role.equalsIgnoreCase(user.getRole());
    }

    private <T> List<T> safeList(ListSupplier<T> supplier) {
        try {
            List<T> result = supplier.get();
            return result == null ? Collections.emptyList() : result;
        } catch (Exception ignored) {
            return Collections.emptyList();
        }
    }

    @FunctionalInterface
    private interface ListSupplier<T> {
        List<T> get();
    }
}
