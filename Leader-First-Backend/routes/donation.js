// server/routes/donation.js
import express from "express";
import Donation from "../models/Donation.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Generate unique transaction ID
const generateTransactionId = () => {
  return `TLF${Date.now()}${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;
};

// ==================== CREATE ====================
// POST /api/donations - Create new donation
router.post("/", auth, async (req, res) => {
  try {
    const {
      donorName,
      donorEmail,
      donorPhone,
      amount,
      paymentMethod,
      message,
    } = req.body;

    // Validation
    if (!donorName || !donorEmail || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, amount, and payment method",
      });
    }

    if (amount < 10) {
      return res.status(400).json({
        success: false,
        message: "Minimum donation amount is ₹10",
      });
    }

    // Generate transaction ID
    const transactionId = generateTransactionId();

    // Create donation record
    const donation = new Donation({
      name: donorName,
      email: donorEmail,
      phone: donorPhone || "",
      message: message || "",
      amount: parseFloat(amount),
      transactionId,
      paymentMethod,
      userId: req.user.id,
    });

    await donation.save();

    res.status(201).json({
      success: true,
      message: "Donation received successfully!",
      data: donation,
      transactionId,
    });
  } catch (error) {
    console.error("Donation creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process donation",
      error: error.message,
    });
  }
});

// ==================== READ ====================
// GET /api/donations - Get all donations (Admin only)
router.get("/", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    const { page = 1, limit = 20 } = req.query;

    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("userId", "name email");

    const total = await Donation.countDocuments();

    res.json({
      success: true,
      data: donations,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch donations error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
    });
  }
});

// GET /api/donations/my-donations - Get user's donations
router.get("/my-donations", auth, async (req, res) => {
  try {
    const donations = await Donation.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: donations,
      count: donations.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your donations",
    });
  }
});

// GET /api/donations/:id - Get single donation
router.get("/:id", auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // Check access (admin or owner)
    if (
      req.user.role !== "admin" &&
      donation.userId?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      data: donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch donation",
    });
  }
});

// ==================== DELETE ====================
// DELETE /api/donations/:id - Delete donation (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.json({
      success: true,
      message: "Donation deleted successfully",
      data: donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete donation",
    });
  }
});

// ==================== STATISTICS ====================
// GET /api/donations/stats/summary - Get donation statistics (Public)
router.get("/stats/summary", async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();

    const totalAmount = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalDonations,
        totalAmount: totalAmount[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
});

export default router;
