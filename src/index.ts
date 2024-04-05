import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import bookRoutes from "./routes/bookRoutes";
import docRoutes from "./routes/docRoutes";
// import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { corsOptions } from "./config/corsOptions";

const main = async () => {
    const app: Express = express();
    app.use(express.json(), cors(corsOptions));
    AppDataSource.initialize();

    app.use("/book", bookRoutes);
    app.use("/doc", docRoutes);
    // app.use("/user", userRoutes);
    app.use("/auth", authRoutes);

    app.listen(4000, () => {
        console.log("Server initialized on localhost:4000")
    });

    app.get('/', (_req: Request, res: Response) => {
        res.send("Hello World")
    })
}

main().catch((error) => {
    console.error(error.message);
});