import { Request, Response } from "express";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const [username, password] = req.body;
        const tokenObj = await authService.loginUser(username, password);

        if(!tokenObj) res.status(401).json({ message: 'Invalid username or password' });
        else {
            // res.cookie("token", tokenObj.token, {
            //     maxAge: (tokenObj.expiresIn as number) * 1000,
            //     httpOnly: false
            // });
            res.status(200).json(tokenObj);            
            // console.log(res.header.toString());
            // res.status(200).json({ message: "Login Successful", userId: tokenObj.userId, userRole: tokenObj.userRole });
        }
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