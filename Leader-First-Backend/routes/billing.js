import express from "express";
import Stripe from "stripe";
import auth from "../middleware/auth.js";
import User from "../models/user.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_MAP = {
  contributor: {
    monthly: process.env.STRIPE_PRICE_CONTRIB_MONTHLY,
    annually: process.env.STRIPE_PRICE_CONTRIB_YEARLY,
  },
  core: {
    monthly: process.env.STRIPE_PRICE_CORE_MONTHLY,
    annually: process.env.STRIPE_PRICE_CORE_YEARLY,
  },
};

router.post("/create-checkout-session", auth, async (req, res, next) => {
  try {
    const { plan, cycle } = req.body; // e.g., 'contributor' | 'core', 'monthly' | 'annually'
    const priceId = PRICE_MAP[plan]?.[cycle];
    if (!priceId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid plan or billing cycle" });
    }

    const user = await User.findById(req.user.id);
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pay/cancel`,
      allow_promotion_codes: true,
      metadata: { userId: String(user._id), plan, cycle },
    });

    res.json({ success: true, url: session.url });
  } catch (e) {
    next(e);
  }
});

// Localhost activation (no webhooks)
router.post("/activate-from-session", auth, async (req, res, next) => {
  try {
    const { session_id } = req.body;
    if (!session_id)
      return res
        .status(400)
        .json({ success: false, message: "session_id required" });

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["subscription", "customer"],
    });
    if (session.payment_status !== "paid") {
      return res
        .status(409)
        .json({ success: false, message: "Payment not completed" });
    }

    const plan = session.metadata?.plan || "contributor";
    const user = await User.findById(req.user.id);
    user.planStatus = "active";
    user.planRenewsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    user.stripeCustomerId =
      session.customer?.id || session.customer || user.stripeCustomerId;
    user.stripeSubscriptionId =
      session.subscription?.id || session.subscription || null;
    await user.save();

    res.json({ success: true, message: `Plan activated (${plan})` });
  } catch (e) {
    next(e);
  }
});

export default router;
