import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { DocService } from "../services/docService";

const userService = new UserService();
const docService = new DocService();

// export const createUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const newUser = await userService.createUser(req.body);
//         res.status(201).json(newUser)
//     } catch(error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
        const user = await userService.getUserById(userId);
        if(!user) res.status(404).json({ message: "User not found" });
        else res.json(user);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res:Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
        const updatedUser = await userService.updateUser(userId, req.body);
        if(!updatedUser) res.status(404).json({ message: "User not found" });
        else res.json(updatedUser);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
        const user = await userService.getUserById(userId);
        const docList = user?.docs;
        docList?.forEach(async (doc) => await docService.deleteDoc(doc.id));
        await userService.deleteUser(userId);
        res.status(204).end();
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};