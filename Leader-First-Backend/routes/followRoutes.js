import express from "express";
import {
  getFollowed,
  followLeader,
  unfollowLeader,
  followCompany,
  unfollowCompany,
} from "../controller/followController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// All routes require auth
router.get("/followed", requireAuth, getFollowed);

router.post("/leader/follow", requireAuth, followLeader);
router.post("/leader/unfollow", requireAuth, unfollowLeader);

router.post("/company/follow", requireAuth, followCompany);
router.post("/company/unfollow", requireAuth, unfollowCompany);

export default router;
