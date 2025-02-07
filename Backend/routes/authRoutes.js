const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ User Registration
router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("✅ Hashed Password at Registration:", hashedPassword); // 🔹 Debugging
  
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("❌ Registration Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

// ✅ User Login Route (ONLY ONE)
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        console.warn("❌ User Not Found:", email);
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      console.log("🔹 Entered Password:", password);
      console.log("🔹 Stored Hashed Password:", user.password);
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.warn("❌ Password Mismatch");
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // ✅ Generate JWT Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      console.log("✅ Login Successful, Token Generated:", token);
      res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

// ✅ Refresh Token Route (NEW)
router.post("/refresh-token", async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });

    // ✅ Generate a new token
    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ newToken });
  } catch (error) {
    console.error("❌ Token Refresh Error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
});

module.exports = router;
