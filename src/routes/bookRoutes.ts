import express from "express";
//import multer from "multer";
import { createBook, deleteBook, getBookByISBN, updateBook } from "../controllers/bookController";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

const bookRouter = express.Router();
// const upload = multer({ dest: "/books" });

bookRouter.post("/", 
    requireAuth, 
    requireRole("admin"),
    // upload.single("pdf"),
    createBook
);

bookRouter.get("/:isbn", getBookByISBN);
bookRouter.put("/:isbn", requireAuth, requireRole("admin"), updateBook);
bookRouter.delete("/:isbn", requireAuth, requireRole("admin"), deleteBook);

export default bookRouter;