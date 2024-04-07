import { Request, Response, NextFunction } from "express";

export const requireUser = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
    try {
        const loggedUser = req.user.id;
        const targetUser = parseInt(req.params.id);
        if(loggedUser !== targetUser) return res.status(403).json({ message: "Forbidden: Incorrect User"})
        next();
    } catch(error) {
        return res.status(401).json({ message: error.message });
    }
}