import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // Import API function

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Error registering user!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <input type="text" placeholder="Name" className="border p-2 w-full mt-4"
          value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="border p-2 w-full mt-4"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="border p-2 w-full mt-4"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full mt-4 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
