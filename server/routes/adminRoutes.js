import { Router } from "express";
import {
  getAllReferrals,
  updateReferralStatus,
  approvePayout,
  markPaid,
  getAllReferrers,
  getDashboardSummary,
} from "../controllers/adminController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/summary", getDashboardSummary);
router.get("/referrals", getAllReferrals);
router.patch("/referrals/:id/status", updateReferralStatus);
router.patch("/referrals/:id/approve", approvePayout);
router.patch("/referrals/:id/paid", markPaid);
router.get("/referrers", getAllReferrers);

export default router;
