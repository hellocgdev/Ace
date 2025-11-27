import express from "express";
import authController from "../controller/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// OTP-based pre‑verification
router.post("/request-otp", authController.requestOtp);
router.post("/verify-otp-register", authController.verifyOtpAndRegister);

// Final signup (Individual / Company / Agency / others)
router.post("/signup", authController.signup);

// Login with email/password
router.post("/login", authController.login);

// Current user
router.get("/me", requireAuth, authController.me);

export default router;
