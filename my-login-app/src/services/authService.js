// API Base URL - Using proxy (relative path)
// The proxy in package.json handles the CORS redirect to localhost:9093
const API_BASE_URL = '/auth';

// Register API Call
export const registerUser = async (userData) => {
  try {
    console.log('Registering user:', userData);
    console.log('API URL:', `${API_BASE_URL}/register`);
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enrollmentNumber: userData.enrollmentNumber,
        name: userData.name,
        email: userData.email,
        password: userData.password,

      }),
    });

    console.log('Register response status:', response.status);
    // Read response as text first (some backend responses may be empty or non-JSON)
    const text = await response.text();
    console.log('Register response text:', text);
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (err) {
      data = null; // non-JSON response
    }

    if (!response.ok) {
      const errMsg = (data && data.message) ? data.message : (text || 'Registration failed');
      throw new Error(errMsg);
    }

    return {
      success: true,
      data: data,
      message: (data && data.message) ? data.message : 'Registration successful!',
    };
  } catch (error) {
    console.log('Register error:', error);
    return {
      success: false,
      message: error.message || 'Registration failed. Please try again.',
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log('Attempting login to:', `${API_BASE_URL}/login`);
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    console.log('Login response status:', response.status);

    // Read response as text first (some backend responses may be empty or non-JSON)
    const text = await response.text();
    console.log('Login response text:', text);
    
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (err) {
      data = null; // non-JSON response
    }

    if (!response.ok) {
      const errMsg = (data && data.message) ? data.message : (text || `Login failed with status ${response.status}`);
      throw new Error(errMsg);
    }

    // Save to localStorage when login is successful
    if (response.ok && data && data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userRole', data.role);
    }

    return {
      success: true,
      message: (data && data.message) ? data.message : 'Login successful!',
      data: data
    };

  } catch (error) {
    console.error('Login error:', error);
    // Check if it's a network error (CORS, server down, etc.)
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return {
        success: false,
        message: 'Unable to connect to server. Please check if the backend is running on port 9093.'
      };
    }
    return {
      success: false,
      message: error.message || 'Login failed. Please try again.'
    };
  }
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Get user info
export const getUserInfo = () => {
  return {
    userId: localStorage.getItem('userId'),
    userName: localStorage.getItem('userName'),
    userRole: localStorage.getItem('userRole'),
    token: localStorage.getItem('authToken'),
  };
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};
export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("authToken");

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
