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
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
};

export { connectDB, emailTransporter, generateOtp, sendError, sendMessage };
