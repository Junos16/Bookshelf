import { Request } from "express";
import { User } from "../models/User";

declare global{
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}

// declare namespace Express {
//     interface Request {
//         user?: User;
//     }
// }