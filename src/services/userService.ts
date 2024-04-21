import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
import { UpdateResult } from "typeorm";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    // async createUser(userData: Partial<User>): Promise<User> {
    //     const newUser = this.userRepository.create(userData);
    //     return await this.userRepository.save(newUser);
    // } 

    async getUserByID(userID: number): Promise<Partial<User> | null> {
        // return await this.userRepository
        //     .createQueryBuilder("user")
        //     .select(Object.getOwnPropertyNames(this.tempUser).filter(element => element !== "password"))
        //     .where("user.id = :userID", { userID })
        //     .getOne();
        
        const user = await this.userRepository.findOneBy({ id: userID });
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } else return user;
    }

    async updateUser(userID: number, newData: Partial<User>): Promise<Partial<User> | null> {
        const updatedUser: UpdateResult = await this.userRepository.update(userID, newData);
        if(updatedUser.affected === 0) return null;
        // return await this.userRepository
        //     .createQueryBuilder("user")
        //     .select(Object.getOwnPropertyNames(this.tempUser).filter(element => element !== "password"))
        //     .where("User.id = :userID", { userID })
        //     .getOne();
        const user = await this.userRepository.findOneBy({ id: userID });
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } else return user;
    }

    async deleteUser(userID: number): Promise<void> {
        await this.userRepository.delete(userID);
    }
}