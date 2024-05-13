import connectDB from "./database.js";
import nodemailer from "nodemailer";

const sendError = (res, statusCode = 400, error) => {
  res.status(statusCode).json({
    error: error,
  });
};

const sendMessage = (res, statusCode = 201, message) => {
  res.status(statusCode).json({
    message: message,
  });
};

const generateOtp = (length = 6) => {
  // Generate 6 digit otp
  let otp = "";
  for (let i = 1; i <= length; ++i) {
    let digit = Math.floor(Math.random() * 9);
    otp += digit;
  }
  return otp;
};

const emailTransporter = function () {
  // Create transporter for emailVerification
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "shailesh.respond@gmail.com",
      pass: process.env.GMAIL_APP_PASS,
    },
  });
  return transporter;
};

export { connectDB, emailTransporter, generateOtp, sendError, sendMessage };
