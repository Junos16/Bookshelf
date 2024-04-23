import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    // async createUser(userData: Partial<User>): Promise<User> {
    //     const newUser = this.userRepository.create(userData);
    //     return await this.userRepository.save(newUser);
    // } 

    async getUserById(userId: number): Promise<Partial<User> | null> {
        // return await this.userRepository
        //     .createQueryBuilder("user")
        //     .select(Object.getOwnPropertyNames(this.tempUser).filter(element => element !== "password"))
        //     .where("user.id = :userID", { userID })
        //     .getOne();
        
        const user = await this.userRepository.findOneBy({ id: userId });
        // console.log(user?.docs);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } else return user;
    }

    async updateUser(userId: number, newData: Partial<User>): Promise<Partial<User> | null> {
        const queryBuilder = await this.userRepository.createQueryBuilder("User");
        
        if (newData.password) {
            const newPassword = await bcrypt.hash(newData.password, 10);
            newData.password = newPassword;
        }
        queryBuilder
            .update(User)
            .set(newData)
            .where("id = :id", { id: userId })
            .execute()
        return await this.userRepository.findOneBy({ id: userId });

        
        // const updatedUser = await this.userRepository.save({
        //     id: userID,
        //     newData
        // });
        // // if (updatedUser) {
        // //     const { password, ...userWithoutPassword } = updatedUser;
        // //     return updatedUser; 
        // // } else return updatedUser;

        // // const updatedUser = await this.userRepository.update(userID, newData);
        // // if(updatedUser.affected === 0) return null;
        // // // return await this.userRepository
        // // //     .createQueryBuilder("user")
        // // //     .select(Object.getOwnPropertyNames(this.tempUser).filter(element => element !== "password"))
        // // //     .where("User.id = :userID", { userID })
        // // //     .getOne();
        // const user = await this.userRepository.findOneBy({ id: userID });
        // console.log(user);
        // if (user) {
        //     const { password, ...userWithoutPassword } = user;
        //     return userWithoutPassword;
        // } else return user;
    }

    async deleteUser(userId: number): Promise<void> {
        await this.userRepository.delete(userId);
    }
}