import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // Import API function

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Track login errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
  
    try {
      const response = await loginUser({ email, password });
  
      if (!response.token) {
        throw new Error("🚫 Login failed: No token received.");
      }
  
      alert("✅ Login successful!");
      navigate("/cart"); // Redirect after login
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      setError(error.message);
      alert(error.message);
    }
  };
  
  
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Login</h2>
        
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Show error if any */}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mt-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full mt-4 rounded">
          Login
        </button>

        <p className="text-sm mt-2">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
