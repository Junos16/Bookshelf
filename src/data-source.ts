import { DataSource } from "typeorm";
import { Book } from "./entities/Book";
import { Doc } from "./entities/Doc";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    entities: [User, Book, Doc],
    synchronize: true,
    logging: true,
})