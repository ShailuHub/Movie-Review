import { Router } from "express";
import {
  createUser,
  verifyEmail,
  resendVerifyEmail,
  signInUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authControllers.js";
import authenticatedUser from "../middleware/authentication.js";
import {
  validateNameEmailPassword,
  validateEmailPassword,
  validateEmailOnly,
  validateResetPassword,
  validate,
} from "../middleware/Validator.js";
const authRouter = Router();

authRouter.post(
  "/create-user",
  validateNameEmailPassword,
  validate,
  createUser
);

authRouter.post("/verify-email", authenticatedUser, verifyEmail);

authRouter.post("/resend-verify-email", authenticatedUser, resendVerifyEmail);

authRouter.post(
  "/forgot-password",
  validateEmailOnly,
  validate,
  forgotPassword
);

authRouter.post(
  "/reset-password",
  validateResetPassword,
  validate,
  resetPassword
);
authRouter.post("/login", validateEmailPassword, validate, signInUser);
export default authRouter;
