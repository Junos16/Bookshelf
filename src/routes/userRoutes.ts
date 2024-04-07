import express from "express";
import { createUser, deleteUser, getUserByID, updateUser } from "../controllers/userControllers";
import { requireAuth } from "../middleware/requireAuth";
import { requireRole } from "../middleware/requireRole";
import { UserRole } from "../../types/userRole";

const userRouter = express.Router();

userRouter.post("/", requireAuth, requireRole(UserRole.ADMIN), createUser);
userRouter.get("/:id", requireAuth, requireRole(UserRole.ADMIN), getUserByID);
userRouter.put(":/id", requireAuth, requireRole(UserRole.ADMIN), updateUser);
userRouter.delete("/:id", requireAuth, requireRole(UserRole.ADMIN), deleteUser);

export default userRouter;