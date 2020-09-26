import { NextFunction, Request, Response } from 'express';
import { HttpException } from "../exeption";

export const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    // logger.log('error', `${status} : ${message}`);
    response.status(status).send({status, message})
};
