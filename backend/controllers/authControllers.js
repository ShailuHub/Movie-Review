import User from "../modals/userModals.js";
import EmailVerification from "../modals/emailVerificationModals.js";
import { isValidObjectId } from "mongoose";

import {
  generateOtp,
  sendError,
  emailTransporter,
  sendMessage,
} from "../util/index.js";
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

// createUser Router
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //store new user
    const newUser = await User.create({ name, email, password });

    let otp = generateOtp();
    //store otp to database
    try {
      await EmailVerification.create({ emailOwner: newUser._id, token: otp });
      //Create transporter for emailVerification
      let transport = emailTransporter();

      //Set postal address for transporter
      transport.sendMail({
        from: "MovieReviewer",
        to: newUser.email,
        subject: "Email verification",
        html: `<p>Your one time password</p><h1>${otp}</h1>`,
      });
    } catch (error) {
      console.log(error);
    }
    sendMessage(
      res,
      201,
      "User is created and email verification code has sent to your registered email"
    );
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    sendError(res, 401, errors);
  }
};

const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!isValidObjectId(userId)) return sendError(res, 400, "Invalid user");
  const user = await User.findById(userId);
  if (!user) return sendError(res, 404, "User not found");

  if (user.isVerified) return sendError(res, 200, "User is already verifed!");

  const token = await EmailVerification.findOne({ emailOwner: userId });
  if (!token) return sendError(res, 404, "Token not found");

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, 400, "Please submit valid otp");
  user.isVerified = true;
  await user.save();

  await EmailVerification.findByIdAndDelete(token._id);

  //Create transporter for emailVerification
  let transport = emailTransporter();

  //Set postal address for transporter
  transport.sendMail({
    from: "MovieReviewer",
    to: user.email,
    subject: `welcome ${user.email}`,
    html: `<p>Welcome to our organization movie review appp</p>`,
  });
};

const resendVerifyEmail = async (req, res) => {
  const { userId } = req.body;
  if (!isValidObjectId(userId)) return sendError(res, 400, "Invalid user");
  const user = await User.findById(userId);
  if (user.isVerified) return sendError(res, 200, "Email is already verified");
  const alreadyHastoken = await EmailVerification.findOne({
    emailOwner: userId,
  });
  if (alreadyHastoken)
    return sendMessage(
      res,
      201,
      "You can able to resend verification email only after 1 hr"
    );

  let otp = generateOtp();
  //store otp to database
  try {
    await EmailVerification.create({ emailOwner: user._id, token: otp });
    //Create transporter for emailVerification
    let transport = emailTransporter();

    //Set postal address for transporter
    transport.sendMail({
      from: "MovieReviewer",
      to: user.email,
      subject: "Email verification",
      html: `<p>Your one time password</p><h1>${otp}</h1>`,
    });
  } catch (error) {
    console.log(error);
  }
  sendError(
    res,
    201,
    "User is created and email verification code has sent to your registered email"
  );
};

export { createUser, verifyEmail, resendVerifyEmail };
