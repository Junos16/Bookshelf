import express from "express";
import { createUser, deleteUser, getUserByID, updateUser } from "../controllers/userControllers";
import { requireAuth, requireRole } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/", requireAuth, requireRole("admin"), createUser);
userRouter.get("/:id", requireAuth, requireRole("admin"), getUserByID);
userRouter.put(":/id", requireAuth, requireRole("admin"), updateUser);
userRouter.delete("/:id", requireAuth, requireRole("admin"), deleteUser);

export default userRouter;