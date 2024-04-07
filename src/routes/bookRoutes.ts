import express from "express";
//import multer from "multer";
import { createBook, deleteBook, getBookByISBN, updateBook } from "../controllers/bookController";
import { requireAuth } from "../middleware/requireAuth";
import { requireRole } from "../middleware/requireRole";
import { UserRole } from "../../types/userRole";

const bookRouter = express.Router();
// const upload = multer({ dest: "/books" });

bookRouter.post("/", 
    requireAuth, 
    requireRole(UserRole.ADMIN),
    // upload.single("pdf"),
    createBook
);

bookRouter.get("/:isbn", getBookByISBN);
bookRouter.put("/:isbn", requireAuth, requireRole(UserRole.ADMIN), updateBook);
bookRouter.delete("/:isbn", requireAuth, requireRole(UserRole.ADMIN), deleteBook);

export default bookRouter;