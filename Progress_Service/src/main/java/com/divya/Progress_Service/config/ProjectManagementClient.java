package com.divya.Progress_Service.config;

import com.divya.Progress_Service.dto.GuideGroupDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "project-management-service", url = "http://localhost:9095")
public interface ProjectManagementClient {
    @GetMapping("/guide/groups")
    List<GuideGroupDto> getGuideGroups(@RequestHeader("Authorization") String token);
}
