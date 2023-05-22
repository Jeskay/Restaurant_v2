import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { authService } from "../services";

export interface JwtRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token)
            throw new Error('Token not found');
        const decoded = authService.verify(token);
        (req as JwtRequest).token = decoded;

        next();
    } catch(err) {
        console.log(err);
        res.status(401).send('Authentication failed');
    }
}