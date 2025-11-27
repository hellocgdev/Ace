// models/paymentRequest.js
import mongoose from "mongoose";

const paymentRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    planKey: {
      type: String,
      enum: ["contributor", "core", "enterprise"],
      required: true,
    },
    amount: { type: Number, required: true }, // in INR
    txId: { type: String, required: true },   // UTR / reference no
    paymentDate: Date,
    note: String,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    adminComment: String,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const PaymentRequest =
  mongoose.models.PaymentRequest ||
  mongoose.model("PaymentRequest", paymentRequestSchema);

export default PaymentRequest;
