package com.divya.Progress_Service.dto;

import java.util.List;

public class GuidePresentationSubmissionRequest {
    private Long presentationId;
    private List<GuidePresentationEntryRequest> entries;

    public Long getPresentationId() {
        return presentationId;
    }

    public void setPresentationId(Long presentationId) {
        this.presentationId = presentationId;
    }

    public List<GuidePresentationEntryRequest> getEntries() {
        return entries;
    }

    public void setEntries(List<GuidePresentationEntryRequest> entries) {
        this.entries = entries;
    }
}
