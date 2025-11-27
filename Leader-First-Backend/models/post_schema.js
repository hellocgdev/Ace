import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  metaTitle: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  rawContent: {
    type: String,
    required: false,
  },
  contentType: {
    type: String,
    enum: ["html", "text", "unsupported"],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});
const Post = mongoose.model("Post", PostSchema);

export default Post;
