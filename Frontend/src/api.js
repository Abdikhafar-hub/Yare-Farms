import axios from "axios";

const API_URL = "https://yare-farms.onrender.com/api/auth"; // ✅ Update to your deployed backend

// ✅ Function to Register User
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// ✅ Function to Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    
    if (response.data.token) {
      console.log("✅ Storing token:", response.data.token); // 🔹 Debugging
      localStorage.setItem("token", response.data.token); // ✅ Store the token
    }

    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
};


// ✅ Function to Get Auth Headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Function to Refresh Token
export const refreshToken = async () => {
  try {
    const oldToken = localStorage.getItem("token");

    if (!oldToken) {
      console.warn("⚠️ No token found, user must log in.");
      return null;
    }

    const response = await axios.post(`${API_URL}/refresh-token`, { token: oldToken });

    if (response.data.newToken) {
      console.log("🔄 New Token Received:", response.data.newToken);
      localStorage.setItem("token", response.data.newToken);
      return response.data.newToken;
    }
    
    return null;
  } catch (error) {
    console.error("❌ Token refresh failed:", error.response?.data || error.message);
    localStorage.removeItem("token");
    window.location.href = "/login"; // ✅ Redirect user to login
    return null;
  }
};


// ✅ Axios Interceptor for Auto Token Refresh & Retrying Failed Requests
axios.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("🔄 Token expired, attempting to refresh...");

      const newToken = await refreshToken();

      if (newToken) {
        // ✅ Retry failed request with new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config);
      }
    }

    return Promise.reject(error);
  }
);
