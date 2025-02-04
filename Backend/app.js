const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const axios = require("axios");
const date = new Date();

const timeStamp = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(
  -2
)}${("0" + date.getDate()).slice(-2)}${("0" + date.getHours()).slice(-2)}${(
  "0" + date.getMinutes()
).slice(-2)}${("0" + date.getSeconds()).slice(-2)}`;

const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const keySecret = consumerKey + ":" + consumerSecret;
const tokenMaker = Buffer.from(keySecret).toString("base64");
let accessToken = "";

axios
  .get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${tokenMaker}`,
      },
    }
  )
  .then((response) => {
    accessToken = response.data.access_token;
  })
  .catch((error) => {
    console.error("Error:", error.response || error.message);
  });

const shortCode = 174379;
const passKey =
  "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const string = `${shortCode}${passKey}${timeStamp}`;
const password = Buffer.from(string).toString("base64");

const initiatePayment = (rawPhone, amount) => {
  
  const phone = String(rawPhone).startsWith("254")
    ? rawPhone
    : `254${rawPhone.substring(1)}`;
  
  axios
    .post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: 1,
        PartyA: phone,
        PartyB: 174379,
        PhoneNumber: phone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "Yare Farm",
        TransactionDesc: "Payment of X",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Use a valid token
        },
      }
    )
    .then((response) => {
      
    })
    .catch((error) => {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    });
};
// const users = [];
app.post("/pay", (req, res) => {
  const { phoneNumber, totalPrice } = req.body;

  initiatePayment(phoneNumber, totalPrice);
  res.send("payment iniatited");
});

app.post("/call_back", (req, res) => {
  console.log("request body received");
  console.log(req.body);
  const response = req.body.Body;
  if (response.stkCallback.ResultCode != 0) {
    return;
  }

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other services like 'hotmail', 'yahoo', etc.
    auth: {
      user: "abdikhafarissack@gmail.com", // Your email address
      pass: "ycfs waeh bzwa rjaw", // Your email password (or use app password if 2FA enabled)
    },
  });

  // Setup email data
  const mailOptions = {
    from: "Yare Farm", // Sender email
    to: "yarefarm@gmail.com", // Recipient email
    subject: "Hello you", // Subject line

    html: "<p>You have some payments from your business Yare Farms!</p>", // HTML body (optional)
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error);
    } else {
      console.log("Email sent:", info.response);
      res.send("sent email");
    }
  });
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Litsening to port ${port}`);
});