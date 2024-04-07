import express from "express";
import { createDoc, deleteDoc, getDocByID, updateDoc } from "../controllers/docController";
import { requireAuth } from "../middleware/requireAuth";
import { requireRole } from "../middleware/requireRole";
import { UserRole } from "../../types/userRole";
import { requireOwner } from "../middleware/requireOwner";

const router = express.Router();

router.post("/", requireAuth, createDoc);
router.get("/:id", requireAuth, getDocByID);
router.put("/:id", requireAuth, requireOwner, updateDoc);
router.put("/:id", requireAuth, requireRole(UserRole.ADMIN), updateDoc);
router.delete("/:id", requireAuth, requireOwner, deleteDoc);
router.delete(":/id", requireAuth, requireRole(UserRole.ADMIN), deleteDoc);

export default router;