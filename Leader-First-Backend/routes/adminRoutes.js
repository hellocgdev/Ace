import express from "express";
import { getAllUsers } from "../controller/adminController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Protect by auth and admin role middleware
router.get("/users", requireAuth, requireRole("admin"), getAllUsers);

export default router;
