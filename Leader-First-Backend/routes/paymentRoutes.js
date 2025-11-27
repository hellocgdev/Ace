// routes/paymentsRoutes.js
import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { priceId } = req.body; // e.g. "price_123"

    if (!priceId) {
      return res.status(400).json({ message: "Missing priceId" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment", // or "subscription"
      line_items: [
        {
          price: priceId, // ✅ MUST be `price`, not `priceId`
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pay/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
});

// POST /api/payments/create-payment-intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const planKey = "core";
    const plan = PLAN_CONFIG[planKey];

    const amount = plan.price * 100; // paise

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      metadata: { userId, planKey },
    });

    res.json({ clientSecret: paymentIntent.client_secret, amount });
  } catch (err) {
    console.error("create-payment-intent error:", err);
    res.status(500).json({ message: "Failed to create payment intent" });
  }
});

export default router;
