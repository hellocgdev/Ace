import mongoose from "mongoose";

const referralCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    discountPercent: {
      type: Number,
      required: true, // 10 or 3
      min: 0,
      max: 100,
    },
    maxRedemptions: {
      type: Number,
      default: 1, // single-use per code; change if you want multiple uses
      min: 1,
    },
    redemptions: {
      type: Number,
      default: 0,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    usedBy: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // author who used it
        payment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "OfflinePayment",
        },
        usedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

referralCodeSchema.index({ owner: 1, active: 1 });
referralCodeSchema.index({ code: 1, active: 1 });

const ReferralCode =
  mongoose.models.ReferralCode ||
  mongoose.model("ReferralCode", referralCodeSchema);

export default ReferralCode;
