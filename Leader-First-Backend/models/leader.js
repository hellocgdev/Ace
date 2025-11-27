import mongoose from "mongoose";

const leaderSchema = new mongoose.Schema(
  {
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
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
    // Company or companies the leader is affiliated with
    companies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
    // Social/links, etc
    website: String,
    linkedin: String,
    twitter: String,
  },
  { timestamps: true }
);

export default mongoose.models.Leader || mongoose.model("Leader", leaderSchema);
