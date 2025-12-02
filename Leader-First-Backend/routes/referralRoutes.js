import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  createReferralCode,
  validateReferralCode,
} from "../controller/referralCodeController.js";

const router = express.Router();

// authors with active plan generate/fetch their referral code
router.post("/create", requireAuth, requireRole("author"), createReferralCode);

// anyone (author buying a plan) can validate a pasted code
router.post("/validate", validateReferralCode);

export default router;
