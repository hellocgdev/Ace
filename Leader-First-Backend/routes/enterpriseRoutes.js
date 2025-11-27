import express from "express";
import { createEnterpriseInquiry } from "../controller/enterpriseController.js";

const router = express.Router();

// POST /api/enterprise
router.post("/", createEnterpriseInquiry);

export default router;
