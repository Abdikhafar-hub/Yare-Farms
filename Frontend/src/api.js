import axios from "axios";

const API_URL = "http://localhost:8000/api/auth"; // Match backend route

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};
