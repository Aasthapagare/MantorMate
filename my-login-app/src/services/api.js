const BASE_URL = "http://localhost:9095";

export const fetchWithAuth = (url, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? "Bearer " + token : "",
      ...options.headers
    }
  });
};