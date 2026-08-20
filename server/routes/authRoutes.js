import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
  getMe,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);
router.get("/profile", requireAuth, getProfile);
router.put("/profile", requireAuth, updateProfile);
router.put("/change-password", requireAuth, changePassword);

export default router;

