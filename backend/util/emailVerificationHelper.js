import nodemailer from "nodemailer";

const generateOtp = function (length = 6) {
  //generate 6 digit otp
  let otp = "";
  for (let i = 1; i <= length; ++i) {
    let digit = Math.floor(Math.random() * 9);
    otp += digit;
  }
  return otp;
};

const emailTransporter = function () {
  //Create transporter for emailVerification
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
};

export { generateOtp, emailTransporter };
