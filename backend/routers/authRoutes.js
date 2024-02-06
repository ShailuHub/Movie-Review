import { Router } from "express";
import {
  createUser,
  verifyEmail,
  resendVerifyEmail,
} from "../controllers/authControllers.js";
const router = Router();

router.post("/create", createUser);
router.post("/verify_email", verifyEmail);
router.post("/resend_verify_email", resendVerifyEmail);
export default router;
