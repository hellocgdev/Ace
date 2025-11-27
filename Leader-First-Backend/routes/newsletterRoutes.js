import express from "express";
import NewsletterSubscriber from "../models/newsletterSubscriber.js";

const router = express.Router();

// POST /api/newsletter/subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email, source } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // if already subscribed, be idempotent
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.json({ message: "Already subscribed" });
    }

    await NewsletterSubscriber.create({
      email,
      source: source || "website",
    });

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to subscribe" });
  }
});

export default router;
