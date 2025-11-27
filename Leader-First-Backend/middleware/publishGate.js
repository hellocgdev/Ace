import User from "../models/user.js";

export async function publishGate(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    user.ensurePeriodWindow();
    if (!user.canPublish()) {
      return res.status(402).json({
        success: false,
        code: "PAYMENT_REQUIRED",
        message:
          "You have reached your free publish limit. Buy a subscription to continue.",
      });
    }
    await user.save(); // persist potential window reset
    next();
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Error gating publish" });
  }
}
