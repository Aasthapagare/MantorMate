const MEETING_BASE = "http://localhost:8083/api/meetings";

// Helper function to get the current token
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const createMeetingRequest = async (meetingData) => {
    const response = await fetch(`${MEETING_BASE}/request`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(meetingData)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create meeting request');
    }
    return response.json();
};

export const getGuideMeetings = async (guideId) => {
    const response = await fetch(`${MEETING_BASE}/guide/${guideId}`, {
        method: 'GET',
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error('Failed to fetch guide meetings');
    }
    return response.json();
};

export const getStudentApprovedMeetings = async (studentId) => {
    const response = await fetch(`${MEETING_BASE}/student/${studentId}/approved`, {
        method: 'GET',
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error('Failed to fetch approved student meetings');
    }
    return response.json();
};

export const getStudentAllMeetings = async (studentId) => {
    const response = await fetch(`${MEETING_BASE}/student/${studentId}/all`, {
        method: 'GET',
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error('Failed to fetch all student meetings');
    }
    return response.json();
};

export const approveMeeting = async (meetingId, scheduledTime) => {
    // URL parameters for scheduledTime
    const response = await fetch(`${MEETING_BASE}/approve/${meetingId}?scheduledTime=${encodeURIComponent(scheduledTime)}`, {
        method: 'PUT',
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error('Failed to approve meeting');
    }
    return response.json();
};

export const rejectMeeting = async (meetingId) => {
    const response = await fetch(`${MEETING_BASE}/reject/${meetingId}`, {
        method: 'PUT',
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error('Failed to reject meeting');
    }
    return response.json();
};

export const completeMeeting = async (meetingId) => {
    const response = await fetch(`${MEETING_BASE}/complete/${meetingId}`, {
        method: 'PUT',
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error('Failed to complete meeting');
    }
    return response.json();
};

const meetingService = {
    createMeetingRequest,
    getGuideMeetings,
    getStudentApprovedMeetings,
    getStudentAllMeetings,
    approveMeeting,
    rejectMeeting,
    completeMeeting
};

export default meetingService;
