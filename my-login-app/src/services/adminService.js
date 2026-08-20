// ===============================
// ADMIN SERVICE - FINAL VERSION
// ===============================

import { fetchWithAuth } from './api';
import { authFetch as authServiceFetch } from './authService';

const ADMIN_BASE_URL = "/admin";
const PROGRESS_BASE_URL = "http://localhost:9097";
const AUTH_BASE_URL = "http://localhost:9093";

// ===============================
// Common Auth Fetch Helper
// ===============================
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  // If token invalid or expired
  if (response.status === 401 || response.status === 403) {
    alert("Access Denied. Please login again.");
    localStorage.clear();
    window.location.href = "/login";
    return;
  }

  return response;
};

// ===============================
// Upload File
// ===============================
export const uploadFile = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${ADMIN_BASE_URL}/upload`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  return response.json();
};

// ===============================
// Get Students
// ===============================
export const getStudents = async () => {
  const response = await authFetch(`${ADMIN_BASE_URL}/students`);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
};

export const getStoredGuides = async () => {
  const response = await authServiceFetch(`${AUTH_BASE_URL}/auth/users/guides`);

  if (!response.ok) {
    throw new Error("Failed to fetch guides");
  }

  return response.json();
};

export const getStoredStudents = async () => {
  const response = await authServiceFetch(`${AUTH_BASE_URL}/users/students`);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
};

export const getCurrentUserDetails = async (userId) => {
  const response = await authServiceFetch(`${AUTH_BASE_URL}/users/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return response.json();
};

// ===============================
// Get Faculty
// ===============================
export const getFaculty = async () => {
  const response = await authFetch(`${ADMIN_BASE_URL}/faculty`);

  if (!response.ok) {
    throw new Error("Failed to fetch faculty");
  }

  return response.json();
};

// ===============================
// Delete Student
// ===============================
export const deleteStudent = async (id) => {
  const response = await authFetch(`${ADMIN_BASE_URL}/students/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }

  return true;
};

// ===============================
// Delete Faculty
// ===============================
export const deleteFaculty = async (id) => {
  const response = await authFetch(`${ADMIN_BASE_URL}/faculty/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete faculty");
  }

  return true;
};

// ===============================
// Get Group Guide Allocations
// ===============================
export const getGroupGuideAllocations = async () => {
  const response = await fetchWithAuth(`${ADMIN_BASE_URL}/group-guide-allocations`);

  if (!response.ok) {
    throw new Error("Failed to fetch group guide allocations");
  }

  return response.json();
};

// ===============================
// Allocate Guide To Group
// ===============================
export const allocateGuideToGroup = async (groupId, guideId) => {
  const response = await fetchWithAuth(`${ADMIN_BASE_URL}/allocate-guide`, {
    method: "POST",
    body: JSON.stringify({ groupId, guideId })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to allocate guide");
  }

  return response.text();
};

// ===============================
// Presentation Schedules
// ===============================
export const getPresentationSchedules = async () => {
  const response = await authServiceFetch(`${PROGRESS_BASE_URL}/admin/presentation`);

  if (!response.ok) {
    throw new Error("Failed to fetch presentation schedules");
  }

  return response.json();
};

export const createPresentationSchedule = async (payload) => {
  const response = await authServiceFetch(`${PROGRESS_BASE_URL}/admin/presentation`, {
    method: "POST",
    body: JSON.stringify({
      presentationNumber: Number(payload.presentationNo),
      presentationTitle: payload.presentationTitle,
      date: payload.date,
      milestoneName: payload.milestoneName,
      expectedCompletion: payload.expectedCompletion,
      milestoneWeight: Number(payload.milestoneWeight)
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to create presentation schedule");
  }

  const text = await response.text();
  return text;
};

export const deletePresentationSchedule = async (id) => {
  const response = await authServiceFetch(`${PROGRESS_BASE_URL}/admin/presentation/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to delete presentation schedule");
  }

  return true;
};
