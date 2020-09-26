import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";

export const infoLoggerMiddleware = (request: Request, response: Response, next: NextFunction) => {
    console.log('log');
    logger.info( `[${request.method}] ${request.url} arguments: ${JSON.stringify(request.body)}`);
    next();
};
