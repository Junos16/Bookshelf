import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser)
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = parseInt(req.params.id);
        const user = await userService.getUserByID(userID);
        if(!user) res.status(404).json({ message: "User not found" });
        else res.json(user);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res:Response): Promise<void> => {
    try {
        const userID = parseInt(req.params.id);
        const updatedUser = await userService.updateUser(userID, req.body);
        if(!updatedUser) res.status(404).json({ message: "User not found" });
        else res.json(updatedUser);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = parseInt(req.params.id);
        await userService.deleteUser(userID);
        res.status(204).end();
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};