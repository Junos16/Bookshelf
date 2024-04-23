import { Request, Response, NextFunction } from "express";
// import { DocService } from "../services/docService";
import { Doc } from "src/models/Doc";

// const docService = new DocService();

export const requireOwner = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
    try {
        // console.log("Owner");
        // const userId = req.user.id;
        // const docId = parseInt(req.params.id);
        // const doc = await docService.getDocByID(docId) as Doc;
        // console.log(doc.owner);

        const idList: number[] = req.user.docs.map((doc: Doc) => doc.id);
        const docId = parseInt(req.params.id);
        if (!idList.includes(docId)) return res.status(403).json({ message: "Forbidden: Incorrect User" });
        next()
    } catch(error) {
        return res.status(403).json({ message: error.message });
    } 
}