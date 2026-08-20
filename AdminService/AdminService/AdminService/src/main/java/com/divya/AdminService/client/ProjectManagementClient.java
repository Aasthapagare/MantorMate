package com.divya.AdminService.client;

import com.divya.AdminService.DTO.AdminGroupAllocationDto;
import com.divya.AdminService.DTO.AllocateGuideRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "project-management-admin", url = "${services.project.url:http://localhost:9095}")
public interface ProjectManagementClient {
    @GetMapping("/admin/group-guide-allocations")
    List<AdminGroupAllocationDto> getGroupGuideAllocations(@RequestHeader(value = "Authorization", required = false) String token);

    @PostMapping("/admin/allocate-guide")
    String allocateGuide(@RequestBody AllocateGuideRequest request,
                         @RequestHeader(value = "Authorization", required = false) String token);
}
