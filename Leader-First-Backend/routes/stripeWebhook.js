// routes/stripeWebhook.js
import express from "express";
import Stripe from "stripe";
import User from "../models/user.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
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
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          const userId = session.metadata?.userId;
          if (userId) {
            const user = await User.findById(userId);
            if (user) {
              user.planStatus = "active";
              user.planRenewsAt = new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ); // or derive from subscription
              user.stripeSubscriptionId = session.subscription || null;
              await user.save();
            }
          }
          break;
        }
        case "customer.subscription.deleted": {
          const sub = event.data.object;
          const users = await User.find({ stripeSubscriptionId: sub.id });
          for (const u of users) {
            u.planStatus = "inactive";
            await u.save();
          }
          break;
        }
        // handle invoice.payment_failed to set inactive on non-payment if you want
      }
      res.json({ received: true });
    } catch (e) {
      console.error("Webhook handler error:", e);
      res.status(500).send("Webhook handler failed");
    }
  }
);

export default router;
