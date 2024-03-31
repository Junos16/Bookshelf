import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    entities: [],
    migrations: [],
    migrationTableName: "",
    synchronize: true,
    logging: true,
})