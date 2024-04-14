import { Request, Response } from "express";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const [username, password] = req.body;
        const token = await authService.loginUser(username, password);

        if(!token) res.status(401).json({ message: 'Invalid username or password' });
        res.json({ token });
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {   
        const newUser = await authService.signUpUser(req.body);
        res.status(201).json(newUser);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
};