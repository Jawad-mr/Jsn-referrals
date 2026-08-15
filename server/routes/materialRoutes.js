import { Router } from "express";
import {
  getMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../controllers/materialController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, getMaterials);
router.post("/", requireAuth, requireAdmin, createMaterial);
router.patch("/:id", requireAuth, requireAdmin, updateMaterial);
router.delete("/:id", requireAuth, requireAdmin, deleteMaterial);

export default router;
