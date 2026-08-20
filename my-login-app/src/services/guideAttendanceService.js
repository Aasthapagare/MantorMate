import { authFetch } from './authService';

const PROJECT_BASE_URL = 'http://localhost:9095';
const PROGRESS_BASE_URL = 'http://localhost:9097';
const AUTH_BASE_URL = 'http://localhost:9093';

const parseJson = async (response, fallbackMessage) => {
  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    data = text || null;
  }

  if (!response.ok) {
    throw new Error(data?.message || text || fallbackMessage);
  }

  return data;
};

export const getGuideGroups = async () => {
  const response = await authFetch(`${PROJECT_BASE_URL}/guide/groups`);
  return parseJson(response, 'Failed to fetch guide groups');
};

export const getAllUsers = async () => {
  const response = await fetch(`${AUTH_BASE_URL}/users/all`);
  return parseJson(response, 'Failed to fetch users');
};

export const getPresentationSchedules = async () => {
  const response = await authFetch(`${PROGRESS_BASE_URL}/guide/presentation-schedules`);
  return parseJson(response, 'Failed to fetch presentation schedules');
};

export const getPresentationAttendance = async (presentationId) => {
  const response = await authFetch(`${PROGRESS_BASE_URL}/guide/presentation/${presentationId}`);
  return parseJson(response, 'Failed to fetch presentation attendance');
};

export const getStudentGuideProgress = async (studentId) => {
  const response = await authFetch(`${PROGRESS_BASE_URL}/guide/student-progress/${studentId}`);
  return parseJson(response, 'Failed to fetch student progress');
};

export const getPresentationMilestones = async (presentationId) => {
  const response = await authFetch(`${PROGRESS_BASE_URL}/guide/milestone/${presentationId}`);
  return parseJson(response, 'Failed to fetch presentation milestones');
};

export const submitPresentationAttendance = async (payload) => {
  const response = await authFetch(`${PROGRESS_BASE_URL}/guide/presentation/submit`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    return parseJson(response, 'Failed to submit presentation attendance');
  }

  const legacyPresentationPayload = payload.entries.map((entry) => ({
    studentId: entry.studentId,
    presentationId: payload.presentationId,
    attended: entry.attended,
    weight: entry.weightage || 0,
    rating: entry.rating || 0,
    notes: entry.notes
  }));

  const markResponse = await authFetch(`${PROGRESS_BASE_URL}/guide/presentation/mark`, {
    method: 'POST',
    body: JSON.stringify(legacyPresentationPayload)
  });

  if (!markResponse.ok) {
    return parseJson(markResponse, 'Failed to submit presentation attendance');
  }

  const completedEntries = payload.entries.filter((entry) => entry.milestoneCompleted);

  await Promise.all(
    completedEntries.map((entry) =>
      authFetch(`${PROGRESS_BASE_URL}/guide/milestone/complete`, {
        method: 'POST',
        body: JSON.stringify({
          studentId: entry.studentId,
          presentationId: payload.presentationId,
          milestoneName: payload.milestoneName,
          weightage: entry.weightage
        })
      }).then((legacyMilestoneResponse) =>
        parseJson(legacyMilestoneResponse, 'Failed to save milestone progress')
      )
    )
  );

  return { message: 'Presentation attendance submitted' };
};

export const submitMeetingAttendance = async (payload) => {
  const response = await authFetch(`${PROGRESS_BASE_URL}/guide/meeting`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return parseJson(response, 'Failed to submit meeting attendance');
};

export const reviewProjectIdea = async (groupId, status) => {
  const response = await authFetch(`${PROJECT_BASE_URL}/guide/idea/${groupId}/review`, {
    method: 'POST',
    body: JSON.stringify({ status })
  });

  return parseJson(response, 'Failed to review project idea');
};
