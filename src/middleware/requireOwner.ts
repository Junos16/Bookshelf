import { Request, Response, NextFunction } from "express";
import { DocService } from "../services/docService";

const docService = new DocService();

export const requireOwner = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
    try {
        const user = req.user;
        const docID = parseInt(req.params.id);
        const doc = await docService.getDocByID(docID);
        const owner = doc?.owner;
        if(user !== owner) return res.status(403).json({ message: "Forbidden: incorrect owner" })
        next();
    } catch(error) {
        return res.status(403).json({ message: error.message });
    } 
}