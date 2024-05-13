import { Router } from "express";
import {
  createUser,
  verifyEmail,
  resendVerifyEmail,
} from "../controllers/authControllers.js";
const router = Router();

router.post("/create-user", createUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-verify-email", resendVerifyEmail);
export default router;
