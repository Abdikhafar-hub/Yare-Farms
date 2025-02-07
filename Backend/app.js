const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes"); // ✅ Import Authentication Routes
const { authMiddleware } = require("./middleware/authMiddleware"); // ✅ Import JWT Middleware

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

/* --------------------------------------------------------
  ✅ M-PESA INTEGRATION (STK PUSH)
----------------------------------------------------------*/

const shortCode = process.env.MPESA_SHORTCODE || "174379";
const passKey = process.env.MPESA_PASSKEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const callbackUrl = process.env.CALLBACK_URL || "https://yourwebsite.com/mpesa/callback";

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

// ✅ STK Push Payment
const initiatePayment = async (rawPhone, amount) => {
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
        Amount: amount,
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: callbackUrl,
        AccountReference: "Yare Farm",
        TransactionDesc: "Payment for Yare Farm Services",
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
  const { phoneNumber, totalPrice } = req.body;

  if (!phoneNumber || !totalPrice) {
    return res.status(400).json({ message: "Phone number and total price are required." });
  }

  console.log(`Processing payment for: ${phoneNumber} Amount: ${totalPrice}`);
  
  // Call initiatePayment function
  const paymentResponse = await initiatePayment(phoneNumber, totalPrice);
  
  if (paymentResponse.error) {
    return res.status(500).json({ message: "Payment initiation failed" });
  }

  res.json({ message: "Payment initiated successfully.", data: paymentResponse });
});

/* --------------------------------------------------------
  ✅ MPESA CALLBACK ROUTE
----------------------------------------------------------*/

app.post("/call_back", (req, res) => {
  console.log("✅ M-Pesa Callback Data Received:", req.body);

  const response = req.body.Body?.stkCallback;
  if (!response || response.ResultCode !== 0) {
    console.log("❌ Payment Failed:", response?.ResultDesc || "Unknown error");
    return res.status(400).send("Payment failed.");
  }

  // ✅ Send Payment Confirmation Email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Yare Farm",
    to: process.env.ADMIN_EMAIL || "jamaa.dahir@gmail.com",
    subject: "Payment Received",
    html: "<p>✅ You have received a payment from Yare Farms!</p>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("❌ Email Error:", error);
      return res.status(500).send("Email notification failed.");
    } else {
      console.log("✅ Email Sent:", info.response);
      res.send("Payment confirmed, email sent.");
    }
  });
});

/* --------------------------------------------------------
  ✅ AUTHENTICATION ROUTES
----------------------------------------------------------*/
app.use("/api/auth",authRoutes); // 🔹 Authentication is now handled in `authRoutes.js`

/* --------------------------------------------------------
  ✅ START SERVER
----------------------------------------------------------*/
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
