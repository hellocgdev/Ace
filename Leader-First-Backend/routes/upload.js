// routes/stripeWebhook.js
import express from "express";
import Stripe from "stripe";
import User from "../models/user.js";
import { PLAN_CONFIG } from "../config/plans.js"; // or wherever you defined it

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }), // important
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // 🔽 Put your snippet here
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object;
      const userId = pi.metadata?.userId;
      const planKey = pi.metadata?.planKey; // "core"

      if (userId && planKey === "core") {
        const plan = PLAN_CONFIG.core;
        const renewsAt = new Date();
        renewsAt.setMonth(renewsAt.getMonth() + 3);

        await User.findByIdAndUpdate(userId, {
          role: "author",
          planStatus: "active",
          planDetails: { ...plan },
          planRenewsAt: renewsAt,
          publishedCountPeriod: 0,
          periodStart: new Date(),
        });
      }
    }

    res.json({ received: true });
  }
);

export default router;
