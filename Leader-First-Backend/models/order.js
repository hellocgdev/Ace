import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    planName: {
      type: String,
      enum: ["contributor", "core"],
      required: true,
    },
    cycle: {
      type: String,
      enum: ["monthly", "annually"],
      required: true,
    },
    amountInr: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },

    // UPI payment details
    upiVpa: {
      type: String,
      required: true, // your merchant UPI ID
    },
    upiPayeeName: {
      type: String,
      default: "The Leaders First",
    },
    upiTxnRef: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    note: {
      type: String,
      default: "Subscription payment",
    },

    // Payment status
    status: {
      type: String,
      enum: ["pending", "paid", "expired", "cancelled"],
      default: "pending",
      index: true,
    },

    // Metadata
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Auto-expire stale orders
orderSchema.methods.checkExpiry = function () {
  if (
    this.status === "pending" &&
    this.expiresAt &&
    this.expiresAt < new Date()
  ) {
    this.status = "expired";
  }
  return this.status;
};

const Order = mongoose.model("Order", orderSchema);
export default Order;
