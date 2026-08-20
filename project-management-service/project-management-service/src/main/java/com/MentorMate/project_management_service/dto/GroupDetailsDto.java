package com.MentorMate.project_management_service.dto;

import java.util.List;

public class GroupDetailsDto {
    private Long groupId;
    private String groupName;
    private String leaderId;
    private String projectTitle;
    private String projectIdea;
    private String ideaStatus;

    private List<String> members;
    private List<GroupMemberDto> memberDetails;

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

    public String getLeaderId() {
        return leaderId;
    }

    public void setLeaderId(String leaderId) {
        this.leaderId = leaderId;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public String getProjectIdea() {
        return projectIdea;
    }

    public void setProjectIdea(String projectIdea) {
        this.projectIdea = projectIdea;
    }

    public String getIdeaStatus() {
        return ideaStatus;
    }

    public void setIdeaStatus(String ideaStatus) {
        this.ideaStatus = ideaStatus;
    }

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }

    public List<GroupMemberDto> getMemberDetails() {
        return memberDetails;
    }

    public void setMemberDetails(List<GroupMemberDto> memberDetails) {
        this.memberDetails = memberDetails;
    }
}
