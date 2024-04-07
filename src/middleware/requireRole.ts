import { Request, Response, NextFunction } from "express";
import { UserRole } from "types/userRole";

export const requireRole = (role: UserRole) => {
    return (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined | void => {
        if(!req.user || req.user.role != role) {
            return res.status(403).json({ message: "Forbidden: Incorrect role" });
        }
        next();
    }

};