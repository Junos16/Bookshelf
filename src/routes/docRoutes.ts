import express from "express";
import { createDoc, deleteDoc, getDocByID, updateDoc } from "../controllers/docController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", requireAuth, createDoc);
router.get("/:id", requireAuth, getDocByID);
router.put("/:id", requireAuth, updateDoc);
router.delete("/:id", requireAuth, deleteDoc);

export default router;