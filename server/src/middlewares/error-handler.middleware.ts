import {NextFunction, Request, Response} from "express";
import * as dotenv from "dotenv";
import ApiError from "./api-error.middleware";
dotenv.config();

export default class ErrorHandler {
    static apiError(err: ApiError, req: Request, res: Response, next: NextFunction) {
        if (err.isOperational) {
            res.status(err.statusCode).json({isError: true, message: err.message});
        } else {
            const msg = process.env.MODE === "PRODUCTION" ? "Something went wrong!" : err.message
            console.error("Server error: ", err.message)
            res.status(500).json({isError: true, message: msg});
        }
        next();
    }
    static routerError(req: Request, res: Response, next: NextFunction) {
        if (!res.headersSent) {
            res.status(404).json({isError: true, message: "Not found!"})
        }
    }
}