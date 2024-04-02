import express from "express";
import { createBook, deleteBook, getBookByISBN, updateBook } from "src/controllers/bookController";

const router = express.Router();

router.post("/", createBook);
router.get("/:id", getBookByISBN);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;