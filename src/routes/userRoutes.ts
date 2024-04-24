import express from "express";
import { deleteUser, getUserById, updateUser } from "../controllers/userControllers";
import { requireAuth } from "../middleware/requireAuth";
// import { requireRole } from "../middleware/requireRole";
// import { UserRole } from "../../types/userRole";
import { requireUser } from "../middleware/requireUser";


const userRouter = express.Router();

// userRouter.post("/", requireAuth, requireRole(UserRole.ADMIN), createUser);
// userRouter.get("/", requireAuth, require)
// userRouter.get("/:id", requireAuth, requireRole(UserRole.ADMIN), getUserByID);
userRouter.get("/:id", requireAuth, requireUser, getUserById);
// userRouter.get("/", requireAuth, requireRole(UserRole.ADMIN), );
// userRouter.put(":/id", requireAuth, requireRole(UserRole.ADMIN), updateUser);
userRouter.put("/:id", requireAuth, requireUser, updateUser);
// userRouter.delete("/:id", requireAuth, requireRole(UserRole.ADMIN), deleteUser);
userRouter.delete("/:id", requireAuth, requireUser, deleteUser);

export default userRouter;