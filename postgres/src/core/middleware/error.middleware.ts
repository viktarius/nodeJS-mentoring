import { NextFunction, Request, Response } from 'express';
import { HttpException } from "../exeption";
import { logger } from "../logger";

export const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    logger.error(`${status}: ${message}`);
    response.status(status).send({status, message})
};
