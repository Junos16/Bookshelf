import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./config/data-source";

const main = async () => {
    const app: Express = express();
    AppDataSource.initialize();

    app.listen(4000, () => {
        console.log("Server initialized on localhost:4000")
    });

    app.get('/', (_req: Request, res: Response) => {
        res.send("Hello World")
    })
}

main().catch((_err) => {
    console.error("Error setting up express server")
});