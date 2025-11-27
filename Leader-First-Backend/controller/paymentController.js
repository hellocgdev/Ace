import qrcode from "qrcode";
import Order from "../models/order.js";
import User from "../models/user.js";

// Merchant config (set in .env)
const MERCHANT_VPA = process.env.UPI_MERCHANT_VPA || "leadersfirst@upi";
const MERCHANT_NAME = process.env.UPI_MERCHANT_NAME || "The Leaders First";
const INTERNAL_PAY_KEY = process.env.INTERNAL_PAY_KEY || "your_secret_key";

// Pricing map
const PRICING = {
  contributor: { monthly: 499, annually: 399 },
  core: { monthly: 24999, annually: 19999 },
};

// Generate unique transaction reference
function generateTxnRef(userId) {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TLF-${Date.now()}-${rand}`;
}

// Build UPI deeplink
function buildUpiDeepLink({ pa, pn, am, tn, tr }) {
  const params = new URLSearchParams();
  params.set("pa", pa);
  params.set("pn", pn);
  if (am) params.set("am", String(am));
  params.set("tn", tn || "Payment");
  params.set("cu", "INR");
  if (tr) params.set("tr", tr);
  return `upi://pay?${params.toString()}`;
}

// 1. Create Order
export const createOrder = async (req, res) => {
  try {
    const { planName, cycle } = req.body;

    if (!planName || !["contributor", "core"].includes(planName)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid plan name" });
    }
    if (!cycle || !["monthly", "annually"].includes(cycle)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid billing cycle" });
    }

    const amountInr = PRICING[planName]?.[cycle];
    if (!amountInr) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid pricing" });
    }

    const upiTxnRef = generateTxnRef(req.user.id);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

    const order = await Order.create({
      userId: req.user.id,
      planName,
      cycle,
      amountInr,
      upiVpa: MERCHANT_VPA,
      upiPayeeName: MERCHANT_NAME,
      upiTxnRef,
      note: `${planName} ${cycle} subscription`,
      expiresAt,
    });

    // Generate UPI deeplink
    const upiLink = buildUpiDeepLink({
      pa: order.upiVpa,
      pn: order.upiPayeeName,
      am: order.amountInr,
      tn: order.note,
      tr: order.upiTxnRef,
    });

    // Generate QR code (PNG data URL)
    const qrPngDataUrl = await qrcode.toDataURL(upiLink, {
      errorCorrectionLevel: "M",
      width: 320,
    });

    res.status(201).json({
      success: true,
      data: {
        orderId: order._id,
        planName: order.planName,
        cycle: order.cycle,
        amountInr: order.amountInr,
        upiLink,
        qrPngDataUrl,
        upiVpa: order.upiVpa,
        upiTxnRef: order.upiTxnRef,
        expiresAt: order.expiresAt,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Check Order Status
export const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, userId: req.user.id });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Check if expired
    order.checkExpiry();
    await order.save();

    res.json({
      success: true,
      data: {
        orderId: order._id,
        status: order.status,
        planName: order.planName,
        cycle: order.cycle,
        amountInr: order.amountInr,
        paidAt: order.paidAt,
      },
    });
  } catch (error) {
    console.error("Get order status error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Mark Order as Paid (Manual/Webhook)
export const markOrderPaid = async (req, res) => {
  try {
    const { upiTxnRef, internalKey } = req.body;

    // Security check
    if (internalKey !== INTERNAL_PAY_KEY) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!upiTxnRef) {
      return res
        .status(400)
        .json({ success: false, message: "upiTxnRef required" });
    }

    const order = await Order.findOne({ upiTxnRef });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.status === "paid") {
      return res.json({
        success: true,
        message: "Order already marked as paid",
      });
    }

    // Mark as paid
    order.status = "paid";
    order.paidAt = new Date();
    await order.save();

    res.json({
      success: true,
      message: "Order marked as paid",
      data: { orderId: order._id, userId: order.userId },
    });
  } catch (error) {
    console.error("Mark order paid error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Activate Subscription (After Payment Confirmed)
export const activateSubscription = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "orderId required" });
    }

    // Find order and verify it's paid
    const order = await Order.findOne({ _id: orderId, userId: req.user.id });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.status !== "paid") {
      return res
        .status(409)
        .json({ success: false, message: "Order not paid yet" });
    }

    // Find user and update plan
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Calculate renewal date (30 days for monthly, 365 days for annual)
    const renewalDays = order.cycle === "monthly" ? 30 : 365;
    const renewsAt = new Date(Date.now() + renewalDays * 24 * 60 * 60 * 1000);

    // Update user plan
    user.planStatus = "active";
    user.planRenewsAt = renewsAt;

    await user.save();

    res.json({
      success: true,
      message: "Subscription activated successfully",
      data: {
        planName: order.planName,
        cycle: order.cycle,
        planStatus: user.planStatus,
        planRenewsAt: user.planRenewsAt,
      },
    });
  } catch (error) {
    console.error("Activate subscription error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
