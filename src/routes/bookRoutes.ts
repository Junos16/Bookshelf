import express from "express";
import multer from "multer";
import { createBook, deleteBook, downloadBook, getBookByISBN, getBooks, updateBook } from "../controllers/bookController";
import { requireAuth } from "../middleware/requireAuth";
import { requireRole } from "../middleware/requireRole";
import { UserRole } from "../../types/userRole";
import { bookStorage } from "../config/multerConfig";

const bookRouter = express.Router();
const upload = multer({ storage: bookStorage });

bookRouter.post(
    "/", 
    requireAuth, 
    requireRole(UserRole.ADMIN),
    upload.single("file"),
    createBook
);

bookRouter.get("/", getBooks);
bookRouter.get("/:isbn", getBookByISBN);
bookRouter.get("/download/:isbn", downloadBook);

bookRouter.put(
    "/:isbn", 
    requireAuth, 
    requireRole(UserRole.ADMIN), 
    upload.single("file"), 
    updateBook
);

bookRouter.delete(
    "/:isbn", 
    requireAuth, 
    requireRole(UserRole.ADMIN), 
    deleteBook
);

export default bookRouter;