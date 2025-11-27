// routes/articleRoutes.js
import express from "express";
import articleController from "../controller/articleController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// author/admin create & edit
router.post(
  "/",
  requireAuth,
  requireRole("author", "admin"),
  articleController.createArticle
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("author", "admin"),
  articleController.updateArticle
);

router.post(
  "/:id/submit",
  requireAuth,
  requireRole("author", "admin"),
  articleController.submitForReview
);

// admin moderation
router.get(
  "/pending",
  requireAuth,
  requireRole("admin"),
  articleController.getPendingArticles
);

router.patch(
  "/:id/moderate",
  requireAuth,
  requireRole("admin"),
  articleController.moderateArticle
);

// author/admin dashboard
router.get(
  "/mine",
  requireAuth,
  requireRole("author", "admin"),
  articleController.getMyArticles
);

// author/admin: fetch single article for editing (any status)
router.get(
  "/secure/:id",
  requireAuth,
  requireRole("author", "admin"),
  articleController.getArticleSecureById
);

// public (these must be last)
router.get("/", articleController.getPublishedArticles);
router.get("/:id", articleController.getPublishedArticleById);

export default router;
