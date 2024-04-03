import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

const JWT_SECRET = "test_secret";

export class AuthService {
    private UserRepository = AppDataSource.getRepository(User);
    
    async loginUser(username: string, password: string): Promise<string | null> {
        const user = await this.UserRepository.findOneBy({ username: username });
        if(!user) return null;

        const isValidPassword = await bcrypt.compareSync(password, user.password);
        if(!isValidPassword) return null;

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
        return token;
    };

    async signUpUser(userData: Partial<User>): Promise<User> {
        const existingUser = await this.UserRepository.findOne({
            where: [{ email: userData.email }, { username: userData.username }]
        });
        if(existingUser) throw new Error("User with same email and username already exists");

        const hashedPassword = await bcrypt.hash(userData.password!, 10);
        const newUser = this.UserRepository.create({ ...userData, password: hashedPassword });
        return await newUser.save();
    }
}