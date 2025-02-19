const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const { authMiddleware } = require("./middleware/authMiddleware");
const User = require("./models/userModel");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

const shortCode = process.env.MPESA_SHORTCODE || "174379";
const passKey = process.env.MPESA_PASSKEY || "your_passkey_here";
const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const callbackUrl = process.env.CALLBACK_URL || "https://yourwebsite.com/mpesa/callback";

// ✅ Helper function to generate M-Pesa timestamp
const getTimestamp = () => {
  const date = new Date();
  return `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}${("0" + date.getHours()).slice(-2)}${("0" + date.getMinutes()).slice(-2)}${("0" + date.getSeconds()).slice(-2)}`;
};

// ✅ Generate Access Token for M-Pesa
const getMpesaAccessToken = async () => {
  try {
    const keySecret = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${keySecret}` },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("❌ M-Pesa Token Error:", error.response?.data || error.message);
    return null;
  }
};

// ✅ Initiate M-Pesa Payment
const initiatePayment = async (rawPhone) => {
  try {
    const accessToken = await getMpesaAccessToken();
    if (!accessToken) throw new Error("Failed to obtain M-Pesa access token.");

    const timeStamp = getTimestamp();
    const password = Buffer.from(`${shortCode}${passKey}${timeStamp}`).toString("base64");
    const phone = rawPhone.startsWith("254") ? rawPhone : `254${rawPhone.substring(1)}`;

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: 1,  // 🔹 Set fixed amount for testing
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: callbackUrl,
        AccountReference: "Yare Farm",
        TransactionDesc: "Test Payment for Yare Farm Services",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("✅ Payment Initiated Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Payment Error:", error.response?.data || error.message);
    return { error: "Payment initiation failed" };
  }
};

// ✅ Protected Payment Route
app.post("/pay", authMiddleware, async (req, res) => {
  try {
      const { phoneNumber, totalPrice } = req.body;

      if (!req.user || !req.user.id) {
          console.error("❌ User not found in token:", req.user);
          return res.status(401).json({ message: "User not found. Please log in." });
      }

      if (!phoneNumber || !totalPrice) {
          return res.status(400).json({ message: "Phone number and total price are required." });
      }

      console.log(`Processing payment for User ID: ${req.user.id}, Phone: ${phoneNumber}, Amount: ${totalPrice}`);

      // ✅ Initiate M-Pesa Payment
      const paymentResponse = await initiatePayment(phoneNumber, totalPrice);
      if (paymentResponse.error) {
          return res.status(500).json({ message: "Payment initiation failed" });
      }

      res.json({ message: "Payment initiated successfully.", data: paymentResponse });
  } catch (error) {
      console.error("❌ Payment Route Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ M-Pesa Callback Route
app.post("/mpesa/callback", async (req, res) => {
  console.log("✅ M-Pesa Callback Data Received:", req.body);

  const response = req.body.Body?.stkCallback;
  if (!response || response.ResultCode !== 0) {
    console.log("❌ Payment Failed:", response?.ResultDesc || "Unknown error");
    return res.status(400).send("Payment failed.");
  }

  res.status(200).json({ message: "Payment confirmed successfully." });
});

// ✅ Authentication Routes
app.use("/api/auth", authRoutes);

// ✅ Start Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
