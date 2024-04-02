import { DataSource } from "typeorm";
import { Book } from "../models/Book";
import { Doc } from "../models/Doc";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql",
    database: "test",
    entities: [User, Book, Doc],
    synchronize: true,
    logging: true,
})