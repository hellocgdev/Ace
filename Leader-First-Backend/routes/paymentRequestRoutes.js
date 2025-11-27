// routes/paymentRequestRoutes.js
import express from "express";
import PaymentRequest from "../models/paymentRequest.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// user submits offline payment form
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, planKey, amount, txId, bankName, paymentDate, note } =
      req.body;

    if (!planKey || !amount || !txId || !name) {
      return res
        .status(400)
        .json({ message: "Name, plan, amount and transaction ID are required" });
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
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit payment" });
  }
});

// admin: list all pending
router.get(
  "/pending",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const list = await PaymentRequest.find({ status: "pending" })
        .sort({ createdAt: -1 })
        .populate("user", "email name role");
      res.json(list);
    } catch {
      res.status(500).json({ message: "Failed to load payments" });
    }
  }
);

// admin: approve or reject
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
        return res
          .status(400)
          .json({ message: "Payment already reviewed" });
      }

      if (action === "approve") {
        // activate plan for user
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
      res.status(500).json({ message: "Failed to review payment" });
    }
  }
);

export default router;
