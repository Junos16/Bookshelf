import express from "express";
import multer from "multer";
import { createDoc, deleteDoc, downloadDoc, getDocById, getDocs, updateDoc } from "../controllers/docController";
import { requireAuth } from "../middleware/requireAuth";
import { requireRole } from "../middleware/requireRole";
import { UserRole } from "../../types/userRole";
import { requireOwner } from "../middleware/requireOwner";
import { docStorage } from "../config/multerConfig";

const router = express.Router();
const upload = multer({ storage: docStorage });

router.post(
    "/", 
    requireAuth, 
    upload.single("file"), 
    createDoc
);

router.get("/:id", requireAuth, getDocById);
router.get("/", requireAuth, getDocs);
router.get("/download/:id", requireAuth, downloadDoc);

router.put(
    "/:id", 
    requireAuth, 
    requireOwner,
    upload.single("file"),
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