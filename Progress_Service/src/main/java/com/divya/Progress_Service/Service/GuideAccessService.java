package com.divya.Progress_Service.Service;

import com.divya.Progress_Service.config.ProjectManagementClient;
import com.divya.Progress_Service.dto.GuideGroupDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GuideAccessService {
    @Autowired
    private ProjectManagementClient projectManagementClient;

    @Autowired
    private HttpServletRequest request;

    public Set<String> getAssignedStudentIds() {
        String token = request.getHeader("Authorization");

        if (token == null || token.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Guide authentication is required");
        }

        List<GuideGroupDto> groups = projectManagementClient.getGuideGroups(token);

        return groups.stream()
                .flatMap(group -> group.getMembers().stream())
                .collect(Collectors.toSet());
    }

    public void validateStudentAccess(String studentId) {
        if (!getAssignedStudentIds().contains(studentId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not assigned to this student");
        }
    }

    public void validateStudentAccess(List<String> studentIds) {
        Set<String> assignedStudentIds = getAssignedStudentIds();
        boolean hasUnauthorizedStudent = studentIds.stream()
                .filter(studentId -> studentId != null && !studentId.isBlank())
                .anyMatch(studentId -> !assignedStudentIds.contains(studentId));

        if (hasUnauthorizedStudent) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "One or more students are not assigned to this guide");
        }
    }
}
