require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mpesaRoutes = require("./routes/mpesaRoutes"); // Import M-Pesa routes

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/mpesa", mpesaRoutes);

// Test route
app.get("/", (req, res) => res.send("M-Pesa API is running! 🚀"));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
