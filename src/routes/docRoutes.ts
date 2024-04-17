import express from "express";
import multer from "multer";
import { createDoc, deleteDoc, getDocByID, getDocs, updateDoc } from "../controllers/docController";
import { requireAuth } from "../middleware/requireAuth";
import { requireRole } from "../middleware/requireRole";
import { UserRole } from "../../types/userRole";
import { requireOwner } from "../middleware/requireOwner";

const router = express.Router();
const upload = multer({ dest: "docs/" });

router.post(
    "/", 
    requireAuth, 
    upload.single("pdf"), 
    createDoc
);

router.get("/:id", requireAuth, getDocByID);
router.get("/", requireAuth, getDocs);

router.put(
    "/:id", 
    requireAuth, 
    requireOwner,
    upload.single("pdf"),
    updateDoc
);

router.put(
    "/:id", 
    requireAuth, 
    requireRole(UserRole.ADMIN), 
    upload.single("pdf"),
    updateDoc
);

router.delete(
    "/:id", 
    requireAuth, 
    requireOwner, 
    deleteDoc
);

router.delete(
    ":/id", 
    requireAuth, 
    requireRole(UserRole.ADMIN), 
    deleteDoc
);

export default router;