import { Router } from "express";
import {
  submitReferral,
  getMyReferrals,
  getMyStats,
  getLeaderboard,
  getRecentPayouts,
} from "../controllers/referralController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public - powers landing page social proof
router.get("/leaderboard", getLeaderboard);
router.get("/activity-feed", getRecentPayouts);

// Authenticated referrer routes
router.post("/", requireAuth, submitReferral);
router.get("/mine", requireAuth, getMyReferrals);
router.get("/mine/stats", requireAuth, getMyStats);

export default router;
