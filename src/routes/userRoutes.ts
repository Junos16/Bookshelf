import express from "express";
import { createUser, deleteUser, getUserByID, updateUser } from "../controllers/userControllers";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/", requireAuth, requireRole("Admin"), createUser);
userRouter.get("/:id", requireAuth, requireRole("Admin"), getUserByID);
userRouter.put(":/id", requireAuth, requireRole("Admin"), updateUser);
userRouter.delete("/:id", requireAuth, requireRole("Admin"), deleteUser);

export default userRouter;