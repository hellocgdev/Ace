import crypto from "crypto";
import ReferralCode from "../models/referralCode.js";
import User from "../models/user.js";

function generateCode() {
  // 6–7 chars, A–Z0–9
  return crypto.randomBytes(4).toString("base64url").toUpperCase().slice(0, 7);
}

// Author generates / fetches their referral code
export const createReferralCode = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.role !== "author") {
      return res
        .status(403)
        .json({ message: "Only authors can generate codes" });
    }

    if (user.planStatus !== "active") {
      return res
        .status(403)
        .json({ message: "Activate a plan to generate referral code" });
    }

    // Reuse existing active code if present
    let existing = await ReferralCode.findOne({ owner: userId, active: true });
    if (existing) {
      return res.json({
        code: existing.code,
        discountPercent: existing.discountPercent,
      });
    }

    const discountPercent = user.planStatus === "active" ? 10 : 3;

    let code;
    while (true) {
      code = generateCode();
      const taken = await ReferralCode.findOne({ code });
      if (!taken) break;
    }

    const referral = await ReferralCode.create({
      code,
      owner: userId,
      discountPercent,
      maxRedemptions: 1,
    });

    return res.status(201).json({
      code: referral.code,
      discountPercent: referral.discountPercent,
    });
  } catch (err) {
    console.error("createReferralCode error:", err);
    return res.status(500).json({ message: "Failed to create referral code" });
  }
};

// Validate referral code when an author pastes it on buy-plan form
// controllers/referralCodeController.js
export const validateReferralCode = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ valid: false, message: "Code required" });
  }

  const normalized = code.trim().toUpperCase();
  const referral = await ReferralCode.findOne({
    code: normalized,
    active: true,
  });

  if (!referral) {
    return res
      .status(404)
      .json({ valid: false, message: "Invalid or expired code" });
  }

  if (referral.redemptions >= referral.maxRedemptions) {
    return res
      .status(400)
      .json({ valid: false, message: "Code has already been used" });
  }

  return res.json({
    valid: true,
    code: referral.code,
    discountPercent: referral.discountPercent,
  });
};

// Internal: mark referral as used AFTER admin approves payment
// controllers/referralCodeController.js
export const markReferralUsed = async (code, usedByUserId, paymentId) => {
  if (!code) return null;
  const normalized = code.trim().toUpperCase();

  const referral = await ReferralCode.findOne({
    code: normalized,
    active: true,
  });
  if (!referral) return null;

  if (referral.redemptions >= referral.maxRedemptions) return null;

  referral.redemptions += 1;
  referral.usedBy.push({ user: usedByUserId, payment: paymentId });

  if (referral.redemptions >= referral.maxRedemptions) {
    referral.active = false;
  }

  await referral.save();
  return referral;
};
