package com.divya.AdminService.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardDto {
    private int totalStudents;
    private int totalFaculty;
    private int totalGroups;
    private long pendingAllocations;
	public AdminDashboardDto(int totalStudents, int totalFaculty, int totalGroups, long pendingAllocations) {
		super();
		this.totalStudents = totalStudents;
		this.totalFaculty = totalFaculty;
		this.totalGroups = totalGroups;
		this.pendingAllocations = pendingAllocations;
	}
    
    
    
    
}
