import { Request, Response, NextFunction } from "express"; 
import jwt from "jsonwebtoken"; 
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

const JWT_SECRET = "test_secret";
const UserRepository = AppDataSource.getRepository(User);

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined | void> => {
    const token = req.header("headers");

    if(!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
        const decoded = parseInt(jwt.verify(token, JWT_SECRET).toString());
        const user  = await UserRepository.findOneBy({ id: decoded });

        if(!user) return res.status(401).json({ message: "Invalid user" });
        req.user = user;
        next();
    } catch(error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export const requireRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined | void => {
        if(!req.user || !req.user.role.includes(role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    }
    
}