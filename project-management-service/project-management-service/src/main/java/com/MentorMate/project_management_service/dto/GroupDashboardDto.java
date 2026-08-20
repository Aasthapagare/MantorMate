package com.MentorMate.project_management_service.dto;

import com.MentorMate.project_management_service.entity.Document;
import com.MentorMate.project_management_service.entity.GroupMember;
import com.MentorMate.project_management_service.entity.GuideAllocation;
import com.MentorMate.project_management_service.entity.GuidePreference;

import java.util.List;

public class GroupDashboardDto {
    private String groupName;
    private String leaderId;
    private String projectTitle;
    private String projectIdea;
    private String ideaStatus;
    private List<GroupMember> members;
    private List<GroupMemberDto> memberDetails;

    private List<GuidePreference> preferredGuides;

    private GuideAllocation allocatedGuide;

    private List<Document> documents;

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

    public String getIdeaStatus() {
        return ideaStatus;
    }

    public void setIdeaStatus(String ideaStatus) {
        this.ideaStatus = ideaStatus;
    }

    public String getProjectIdea() {
        return projectIdea;
    }

    public void setProjectIdea(String projectIdea) {
        this.projectIdea = projectIdea;
    }

    public List<GroupMember> getMembers() {
        return members;
    }

    public void setMembers(List<GroupMember> members) {
        this.members = members;
    }

    public List<GroupMemberDto> getMemberDetails() {
        return memberDetails;
    }

    public void setMemberDetails(List<GroupMemberDto> memberDetails) {
        this.memberDetails = memberDetails;
    }

    public List<GuidePreference> getPreferredGuides() {
        return preferredGuides;
    }

    public void setPreferredGuides(List<GuidePreference> preferredGuides) {
        this.preferredGuides = preferredGuides;
    }

    public GuideAllocation getAllocatedGuide() {
        return allocatedGuide;
    }

    public void setAllocatedGuide(GuideAllocation allocatedGuide) {
        this.allocatedGuide = allocatedGuide;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }
}
