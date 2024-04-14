import { Request, Response } from "express";
import { DocService } from "../services/docService";

const docService = new DocService();

export const createDoc = async (req: Request, res: Response): Promise<void> => {
    try {
        req.body.owner = req.user.id;
        const newDoc = await docService.createDoc(req.body);
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
        const { filterBy, sortBy, sortOrder, limit, offset } = req.body;
        //console.log(sortBy);
        //console.log(sortOrder);
        const docs = await docService.getDocs(filterBy, sortBy, sortOrder, limit, offset);
        if(!docs) res.status(404).json({ message: "No documents found" });
        else res.json(docs);        
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateDoc = async (req: Request, res:Response): Promise<void> => {
    try {
        const docID = parseInt(req.params.id);
        const updatedDoc = await docService.updateDoc(docID, req.body);
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