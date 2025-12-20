import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { ErrorApp } from "../Interfaces/ErrorApp";

export const errorHandler = (err: ErrorApp, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500;

    if (statusCode < 500) {
        logger.warn(err.message,
            {
                method: err.method ?? undefined,
                func: err.func ?? undefined,
                path: err.path ?? undefined,
                status: err.status,
                reason: err.reason ?? undefined,
                data: err.data ?? undefined
            });
    }
    else {
        logger.error(err.message,
            {
                method: err.method ?? undefined,
                func: err.func ?? undefined,
                path: err.path ?? undefined,
                status: err.status,
                reason: err.reason ?? undefined,
                data: err.data ?? undefined
            });
    }

    return res.status(statusCode).json({ message: err.message || "Internal Server Error", data: err.data });
};
