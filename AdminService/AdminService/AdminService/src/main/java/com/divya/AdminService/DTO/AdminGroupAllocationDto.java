package com.divya.AdminService.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminGroupAllocationDto {
    private Long groupId;
    private String groupName;
    private String projectTitle;
    private List<GuideOptionDto> selectedGuides;
    private String allocatedGuideId;
    private String allocatedGuideName;
    private String status;
	public Long getGroupId() {
		return groupId;
	}
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getProjectTitle() {
		return projectTitle;
	}
	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}
	public List<GuideOptionDto> getSelectedGuides() {
		return selectedGuides;
	}
	public void setSelectedGuides(List<GuideOptionDto> selectedGuides) {
		this.selectedGuides = selectedGuides;
	}
	public String getAllocatedGuideId() {
		return allocatedGuideId;
	}
	public void setAllocatedGuideId(String allocatedGuideId) {
		this.allocatedGuideId = allocatedGuideId;
	}
	public String getAllocatedGuideName() {
		return allocatedGuideName;
	}
	public void setAllocatedGuideName(String allocatedGuideName) {
		this.allocatedGuideName = allocatedGuideName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
    
    
}
