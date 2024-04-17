import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

const JWT_SECRET = "test_secret"; // set as env var

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);
    
    async loginUser(username: string, password: string): Promise<null | Record<string, string | number>> {
        const user = await this.userRepository.findOneBy({ username: username });
        if(!user) return null;

        const isValidPassword = await bcrypt.compareSync(password, user.password);
        if(!isValidPassword) return null;

        const expiresIn = 3600; // set as env var
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn });
        return { token, expiresIn };
    };
    
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