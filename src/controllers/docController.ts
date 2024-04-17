import { Request, Response } from "express";
import { DocService } from "../services/docService";

const docService = new DocService();

export const createDoc = async (req: Request, res: Response): Promise<void> => {
    try {
        req.body.owner = req.user.id;
        const name = req.file?.filename;
        const path = req.file?.path;
        const docDatawithFile = {
            ...req.body,
            filename: name,
            filepath: path
        };

        const newDoc = await docService.createDoc(docDatawithFile);
        res.status(201).json(newDoc);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }   
};

export const getDocByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const docID = parseInt(req.params.id);
        const doc = await docService.getDocByID(docID);
        if(!doc) res.status(404).json({ message: "Document not found" });
        else res.json(doc);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDocs = async (req: Request, res: Response): Promise<void> => {
    try {
        const { filterByKey, filterByValue, sortBy, sortOrder, limit, offset } = req.body;
        //console.log(sortBy);
        //console.log(sortOrder);
        const docs = await docService.getDocs(
            filterByKey as string, 
            filterByValue as number | string, 
            sortBy as string, 
            sortOrder as "ASC" | "DESC", 
            parseInt(limit as string), 
            parseInt(offset as string)
        );
        
        if(!docs) res.status(404).json({ message: "No documents found" });
        else res.json(docs);        
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateDoc = async (req: Request, res:Response): Promise<void> => {
    try {
        const docID = parseInt(req.params.id);
        const name = req.file?.filename;
        const path = req.file?.path;
        const docDatawithFile = {
            ...req.body,
            filename: name,
            filepath: path
        };

        const updatedDoc = await docService.updateDoc(docID, docDatawithFile        );
        if(!updatedDoc) res.status(404).json({ message: "Document not found" });
        else res.json(updatedDoc);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDoc = async (req: Request, res: Response): Promise<void> => {
    try {
        const docID = parseInt(req.params.id);
        await docService.deleteDoc(docID);
        res.status(204).end();
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};