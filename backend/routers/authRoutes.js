import { Router } from "express";
import {
  createUser,
  verifyEmail,
  resendVerifyEmail,
  signInUser,
} from "../controllers/authControllers.js";
const router = Router();

router.post("/create-user", createUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-verify-email", resendVerifyEmail);
router.post("/login", signInUser);
export default router;
