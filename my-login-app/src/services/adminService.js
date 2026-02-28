// ===============================
// ADMIN SERVICE - FINAL VERSION
// ===============================

const ADMIN_BASE_URL = "/admin";

// ===============================
// Common Auth Fetch Helper
// ===============================
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("authToken");

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
  const token = localStorage.getItem("authToken");

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