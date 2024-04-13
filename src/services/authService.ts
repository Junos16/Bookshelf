import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
//import { UserRole } from "../../types/userRole";

const JWT_SECRET = "test_secret";

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);
    
    async loginUser(username: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findOneBy({ username: username });
        if(!user) return null;

        const isValidPassword = await bcrypt.compareSync(password, user.password);
        if(!isValidPassword) return null;

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
        return token;
    };

    // async signUpUser(userData: Partial<User>): Promise<User> {
    //     const existingUser = await this.userRepository.findOne({
    //         where: [{ email: userData.email }, { username: userData.username }]
    //     });
    //     if(existingUser) throw new Error("User with same email and username already exists");

    //     const hashedPassword = await bcrypt.hash(userData.password!, 10);
    //     userData.password = hashedPassword;
    //     const newUser = this.userRepository.create({ ...userData });
    //     return await newUser.save();
    // }

    async signUpUser(userData: Partial<User>): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: [{ email: userData.email }, { username: userData.username }]
        });
        if(existingUser) throw new Error("User with same email and username already exists");
        //if(userData.role == UserRole.ADMIN) throw new Error("")
        const hashedPassword = await bcrypt.hash(userData.password!, 10);
        userData.password = hashedPassword;
        const newUser = this.userRepository.create(userData);
        return await this.userRepository.save(newUser);
    };

}   