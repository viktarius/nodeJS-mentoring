import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../../config/app.config";

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['x-access-token'];
    if(!token){
        return res.status(401).send({success: false, message: 'No token provided.'})
    }

    return jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).send({success: false, message: 'Failed to authenticate token.'})
        }

        return next();
    })
};
