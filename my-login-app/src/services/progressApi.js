import axios from "axios";

const BASE_URL = "http://localhost:9097";

export const getProgress = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${BASE_URL}/student/progress/progress`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

export const getMilestones = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${BASE_URL}/student/progress/milestones`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};