const BASE_URL = "http://localhost:9095/guide";

export const fetchGuideGroups = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/groups`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch groups");
  }

  return response.json();
};

export const fetchGroupMembers = async (groupId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/groups/${groupId}/members`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch group members");
  }

  return response.json();
};

export const fetchPresentationSchedules = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:9095/admin/schedules`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch presentation schedules");
  }

  return response.json();
};

export const submitPresentationAttendance = async (attendancePayload) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/presentation/mark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(attendancePayload)
  });

  if (!response.ok) {
    throw new Error("Failed to submit presentation attendance");
  }

  return response.text();
};

export const submitMilestoneCompletion = async (milestonePayload) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/milestone/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(milestonePayload)
  });

  if (!response.ok) {
    throw new Error("Failed to submit milestone completion");
  }

  return response.text();
};
