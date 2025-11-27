// routes/upload.js
import express from "express";
import { uploadThumbnail, uploadContentImage } from "../config/cloudinary.js";

const router = express.Router();

// Thumbnail upload (card image, sidebar preview, etc.)
router.post("/thumbnail", uploadThumbnail.single("thumbnail"), (req, res) => {
  if (!req.file?.path) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  return res.json({
    url: req.file.path,
    publicId: req.file.filename,
  });
});

// Content image upload (for TipTap editor images)
router.post(
  "/content-image",
  uploadContentImage.single("image"),
  (req, res) => {
    if (!req.file?.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    return res.json({
      url: req.file.path,
      publicId: req.file.filename,
    });
  }
);

export default router;
