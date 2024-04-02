import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";

const main = async () => {
    const app = express();
    AppDataSource.initialize();

    app.listen(4000, () => {
        console.log("Server initialized on localhost:4000")
    });

    app.get('/', (_req, res) => {
        res.send("Hello World")
    })
}

main().catch((_err) => {
    console.error("Error setting up express server")
});