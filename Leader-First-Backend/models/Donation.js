// server/models/Donation.js
import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  // Donor Information (simplified)
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    maxlength: 500,
  },

  // Donation Details
  amount: {
    type: Number,
    required: true,
    min: 10,
  },

  // Transaction Details
  transactionId: {
    type: String,
    unique: true,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },

  // User Reference (from auth)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Donation", donationSchema);
