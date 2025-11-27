import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for thumbnails
const thumbnailStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog/thumbnails",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, height: 630, crop: "limit" }],
  },
});

// Storage for content images
const contentImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog/content-images",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
  },
});

export const uploadThumbnail = multer({ storage: thumbnailStorage });
export const uploadContentImage = multer({ storage: contentImageStorage });
export { cloudinary };

export default cloudinary;
