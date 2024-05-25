import User from "../modals/userModals.js";
import EmailVerification from "../modals/emailVerificationModals.js";
import { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";

import {
  generateOtp,
  sendError,
  emailTransporter,
  sendMessage,
} from "../util/index.js";
import PasswordReset from "../modals/passwordResetModals.js";
// Handle Error
const handleError = (err) => {
  let errors = { name: "", email: "", password: "" };
  if (err._message === "User validation failed") {
    const errorArray = Object.values(err.errors);
    errorArray.forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user with the provided email already exists
    const user = await User.findOne({ email });
    if (user) return sendError(res, 401, "Email already exists");

    // Create a new user
    const newUser = await User.create({ name, email, password });

    // Generate OTP for email verification
    let otp = generateOtp();

    try {
      // Store OTP in the database
      await EmailVerification.create({ emailOwner: newUser._id, token: otp });

      // Create transporter for email verification
      let transport = emailTransporter();

      // Send email with OTP for email verification
      transport.sendMail({
        from: "MovieReviewer",
        to: newUser.email,
        subject: "Email Verification",
        html: `<p>Your one-time password</p><h1>${otp}</h1>`,
      });
    } catch (error) {
      console.log(error);
    }

    // Send success message
    sendMessage(
      res,
      201,
      "User is created and an email verification code has been sent to your registered email"
    );
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    sendError(res, 401, errors);
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist, return error
    if (!user) return sendError(res, 401, "Email doesn't match");

    // Compare provided password with user's password
    const isMatched = await user.comparePassword(password);

    // If passwords don't match, return error
    if (!isMatched) return sendError(res, 401, "Password doesn't match");

    // If email and password are correct, generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        email: email,
      },
      process.env.JSON_WEB_SECRET_KEY,
      { expiresIn: "1hr" }
    );

    // Send token in response
    sendMessage(res, 201, { token: token });
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    sendError(res, 500, errors);
  }
};

const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const { _id } = req.user;

  try {
    // Validate userId
    if (!isValidObjectId(_id)) return sendError(res, 400, "Invalid user");

    // Find user by userId
    const user = await User.findById(_id);
    if (!user) return sendError(res, 404, "User not found");

    // Check if user is already verified
    if (user.isVerified)
      return sendError(res, 200, "User is already verified!");

    // Find email verification token for the user
    const token = await EmailVerification.findOne({ emailOwner: _id });
    if (!token) return sendError(res, 404, "Token not found");

    // Compare OTP with stored token
    const isMatched = await token.compareToken(otp);
    if (!isMatched) return sendError(res, 400, "Please submit a valid OTP");

    // Update user's verification status
    user.isVerified = true;
    await user.save();

    // Delete the used email verification token
    await EmailVerification.findByIdAndDelete(token._id);

    // Send welcome email to the user
    let transport = emailTransporter();
    transport.sendMail({
      from: "MovieReviewer",
      to: user.email,
      subject: `Welcome ${user.email}`,
      html: `<p>Welcome to our organization movie review app!</p>`,
    });

    sendMessage(res, 201, "Successfully verified user");
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    sendError(res, 401, errors);
  }
};

const resendVerifyEmail = async (req, res) => {
  const { _id } = req.user;

  // Validate userId
  if (!isValidObjectId(_id)) return sendError(res, 400, "Invalid user");

  // Find user by userId
  const user = await User.findById(_id);

  // Check if user is already verified
  if (user.isVerified) return sendError(res, 200, "Email is already verified");

  // Check if a verification token already exists for the user
  const alreadyHasToken = await EmailVerification.findOne({
    emailOwner: _id,
  });
  if (alreadyHasToken)
    return sendMessage(
      res,
      201,
      "You can only resend the verification email after 1 hour"
    );

  // Generate OTP for email verification
  let otp = generateOtp();

  try {
    // Store OTP in the database
    await EmailVerification.create({ emailOwner: user._id, token: otp });

    // Create transporter for email verification
    let transport = emailTransporter();

    // Send email with OTP
    transport.sendMail({
      from: "MovieReviewer",
      to: user.email,
      subject: "Email Verification",
      html: `<p>Your one-time password</p><h1>${otp}</h1>`,
    });

    // Send success message
    sendMessage(res, 201, "Successfully sent one-time password via email");
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    sendError(res, 401, errors);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return sendError(res, 401, "User not found");

    // Check if password reset token already exists for the user
    const alreadyHasToken = await PasswordReset.findOne({
      emailOwner: user._id,
    });
    if (alreadyHasToken)
      return sendMessage(
        res,
        201,
        "You can only resend the reset password link after 1 hour"
      );

    // Generate JWT token for password reset
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JSON_WEB_SECRET_KEY,
      { expiresIn: "15m" }
    );

    // Create password reset entry in database
    await PasswordReset.create({ emailOwner: user._id, token });

    // Send email with password reset link
    let transport = emailTransporter();
    try {
      transport.sendMail({
        from: "MovieReviewer",
        to: user.email,
        subject: "Reset Your Password",
        html: `<a href="http://localhost:5173/reset-password?token=${token}" style="text-decoration:none; color:blue;">Change your password</a>`,
      });
      sendMessage(
        res,
        201,
        "Reset password link has been sent to the registered email"
      );
    } catch (error) {
      console.log(error);
      sendError(
        res,
        501,
        "Internal error: unable to send password reset email"
      );
    }
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    sendError(res, 401, errors);
  }
};

const resetPassword = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { password, newPassword } = req.body;

  try {
    // Check if token exists
    if (!token) return sendError(res, 400, "Unauthorized user");

    // Check if password and newPassword match
    if (password !== newPassword)
      return sendError(res, 400, "Password and newPassword must match");

    // Verify the JWT token
    const decodeToken = jwt.verify(token, process.env.JSON_WEB_SECRET_KEY);

    // Find the corresponding password reset token in the database
    const passwordResetToken = await PasswordReset.findOne({
      emailOwner: decodeToken._id,
    });

    // Check if the provided token matches the one stored in the database
    if (passwordResetToken.token !== token)
      return sendError(res, 400, "Link expired, generate another");

    // Find the user by ID
    const user = await User.findById(decodeToken._id);

    // Check if the user exists
    if (!user) return sendError(res, 401, "User not found");

    // Check if the old password matches the new password
    if (token !== passwordResetToken.token)
      return sendError(
        res,
        401,
        "Old password should not be the same as the new password"
      );

    // Update the user's password
    user.password = newPassword;
    await user.save();
    await PasswordReset.findByIdAndDelete(passwordResetToken._id);
    return sendMessage(res, 201, "Password has been successfully reset");
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    sendError(res, 500, errors);
  }
};

export {
  createUser,
  verifyEmail,
  resendVerifyEmail,
  signInUser,
  forgotPassword,
  resetPassword,
};
