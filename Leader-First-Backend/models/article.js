import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    leaderFeatured: {
      type: String,
      // ref: "User", // or "Leader" if using separate Leader schema
      default: null, // Optional field
    },
    thumbnail: {
      url: {
        type: String,
        required: false,
      },
      alt: String,
      publicId: String,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: String,
        publicId: String,
      },
    ],
    category: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "pending", "published"],
      default: "draft",
      index: true,
    },
    rejectionReason: {
      type: String,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.index({ category: 1, publishedAt: -1 });
articleSchema.index({ author: 1 });

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);
export default Article;
