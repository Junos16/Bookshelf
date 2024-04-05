import express from "express";
//import multer from "multer";
import { createBook, deleteBook, getBookByISBN, updateBook } from "../controllers/bookController";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

const bookRouter = express.Router();
// const upload = multer({ dest: "/books" });

bookRouter.post("/", 
    requireAuth, 
    requireRole("Admin"),
    // upload.single("pdf"),
    createBook
);

bookRouter.get("/:id", getBookByISBN);
bookRouter.put("/:id", requireAuth, requireRole("Admin"), updateBook);
bookRouter.delete("/:id", requireAuth, requireRole("Admin"), deleteBook);

export default bookRouter;