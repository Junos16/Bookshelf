import express from "express";
import { createDoc, deleteDoc, getDocByID, updateDoc } from "../controllers/docController";

const router = express.Router();

router.post("/", createDoc);
router.get("/:id", getDocByID);
router.put("/:id", updateDoc);
router.delete("/:id", deleteDoc);

export default router;