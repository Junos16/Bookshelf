import { Request, Response, NextFunction } from "express";
import { Doc } from "src/models/Doc";

export const requireOwner = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
    try {
        const idList: number[] = req.user.docs.map((doc: Doc) => doc.id);
        const docId = parseInt(req.params.id);
        if (!idList.includes(docId)) return res.status(403).json({ message: "Forbidden: Incorrect User" });
        next()
    } catch(error) {
        return res.status(403).json({ message: error.message });
    } 
}