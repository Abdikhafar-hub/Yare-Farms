import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // Import API function

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/cart");
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Login</h2>
        <input type="email" placeholder="Email" className="border p-2 w-full mt-4"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="border p-2 w-full mt-4"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full mt-4 rounded">Login</button>
        <p className="text-sm mt-2">Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;
