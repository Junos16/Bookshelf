import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
import { UpdateResult } from "typeorm";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async createUser(userData: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(userData);
        return await this.userRepository.save(newUser);
    } 

    async getUserByID(userID: number): Promise<User | null> {
        return await this.userRepository.findOneBy({ id: userID });
    }

    async updateUser(userID: number, newData: Partial<User>): Promise<User | null> {
        const updatedUser: UpdateResult = await this.userRepository.update(userID, newData);
        if(updatedUser.affected === 0) return null;
        return await this.userRepository.findOneBy({ id: userID });
    }

    async deleteUser(userID: number): Promise<void> {
        await this.userRepository.delete(userID);
    }
}