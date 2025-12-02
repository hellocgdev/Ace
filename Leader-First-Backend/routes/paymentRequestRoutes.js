// routes/paymentRequestRoutes.js
import express from "express";
import PaymentRequest from "../models/paymentRequest.js";
import ReferralCode from "../models/referralCode.js";
import { markReferralUsed } from "../controller/referralCodeController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// user submits offline payment form
router.post("/", requireAuth, async (req, res) => {
  try {
    const {
      name,
      planKey,
      amount,
      txId,
      bankName,
      paymentDate,
      note,
      referralCode, // optional
    } = req.body;

    if (!planKey || !amount || !txId || !name) {
      return res
        .status(400)
        .json({
          message: "Name, plan, amount and transaction ID are required",
        });
    }

    let normalizedCode = null;
    let referralDiscountPercent = null;

    if (referralCode && referralCode.trim()) {
      normalizedCode = referralCode.trim().toUpperCase();

      const referral = await ReferralCode.findOne({
        code: normalizedCode,
        active: true,
      });

      // if already used or not found, block immediately
      if (!referral || referral.redemptions >= referral.maxRedemptions) {
        return res
          .status(400)
          .json({ message: "Invalid or already used referral code" });
      }

      referralDiscountPercent = referral.discountPercent;

      // IMPORTANT: mark as used right now so nobody else can use it
      await markReferralUsed(normalizedCode, req.user._id, null);
      // passing null for paymentId because PaymentRequest is not created yet
    }

    const payment = await PaymentRequest.create({
      user: req.user._id,
      name,
      email: req.user.email,
      planKey,
      amount,
      txId,
      bankName,
      paymentDate: paymentDate ? new Date(paymentDate) : undefined,
      note,
      referralCode: normalizedCode,
      referralDiscountPercent,
    });

    res.status(201).json(payment);
  } catch (err) {
    console.error("paymentRequest POST error:", err);
    res.status(500).json({ message: "Failed to submit payment" });
  }
});

// admin: list all pending
router.get("/pending", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const list = await PaymentRequest.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .populate("user", "email name role");
    res.json(list);
  } catch (err) {
    console.error("paymentRequest GET /pending error:", err);
    res.status(500).json({ message: "Failed to load payments" });
  }
});

// admin: approve or reject (no referral logic here)
router.patch(
  "/:id/review",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const { action, adminComment } = req.body;
      const payment = await PaymentRequest.findById(req.params.id).populate(
        "user"
      );
      if (!payment) return res.status(404).json({ message: "Not found" });
      if (payment.status !== "pending") {
        return res.status(400).json({ message: "Payment already reviewed" });
      }

      if (action === "approve") {
        const { PLAN_CONFIG } = await import("../config/plans.js");
        const plan = PLAN_CONFIG[payment.planKey];
        if (!plan) {
          return res
            .status(400)
            .json({ message: "Invalid plan on payment record" });
        }

        const renewsAt = new Date();
        renewsAt.setMonth(renewsAt.getMonth() + 3);

        payment.user.role = "author";
        payment.user.planStatus = "active";
        payment.user.planDetails = plan;
        payment.user.planRenewsAt = renewsAt;
        payment.user.publishedCountPeriod = 0;
        payment.user.periodStart = new Date();
        await payment.user.save();

        payment.status = "approved";
      } else if (action === "reject") {
        payment.status = "rejected";
      } else {
        return res.status(400).json({ message: "Invalid action" });
      }

      payment.adminComment = adminComment || "";
      payment.reviewedBy = req.user._id;
      await payment.save();

      res.json(payment);
    } catch (err) {
      console.error("paymentRequest PATCH /:id/review error:", err);
      res.status(500).json({ message: "Failed to review payment" });
    }
  }
);

export default router;
