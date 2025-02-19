import axios from "axios";

const API_URL = "https://yare-farms.onrender.com/api/auth"; // ✅ Update to your deployed backend

// ✅ Function to Register User
export const registerUser = async (userData) => {
  try {
    console.log("📤 Sending Registration Data:", userData); // Debugging

    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" }, // ✅ Ensure correct headers
    });

    console.log("✅ Registration Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Registration Failed:", error.response?.data || error.message);

    // ✅ Provide a meaningful error message to the user
    throw new Error(error.response?.data?.message || "Registration failed. Please try again.");
  }
};



// ✅ Function to Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);

    console.log("✅ Full Backend Response:", response.data); // Debugging

    if (!response.data.token) {
      throw new Error("❌ Login failed: No token received.");
    }

    // ✅ Store token only (No user details)
    localStorage.setItem("token", response.data.token);

    return { token: response.data.token };
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong.");
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
    const oldRefreshToken = localStorage.getItem("refreshToken");

    if (!oldRefreshToken) {
      console.warn("⚠️ No refresh token found, user must log in.");
      return null;
    }

    console.log("🔄 Attempting token refresh...");
    const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken: oldRefreshToken });

    if (response.data.token && response.data.refreshToken) {
      console.log("✅ New Tokens Received:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      return response.data.token;
    }
    
    return null;
  } catch (error) {
    console.error("❌ Token refresh failed:", error.response?.data || error.message);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login"; // ✅ Redirect user to login
    return null;
  }
};

// ✅ Create Axios Instance
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Axios Request Interceptor (Attach Token)
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Axios Response Interceptor (Auto Refresh Token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn("🔄 Token expired, attempting to refresh...");

      originalRequest._retry = true; // ✅ Prevent infinite retry loops
      const newToken = await refreshToken();

      if (newToken) {
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
