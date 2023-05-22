import { validationPipe } from "./validation.pipe"
import { Request, Response, NextFunction } from "express";

export const validationMiddleware = (validationScheme: any) => async (req: Request, res: Response, next: NextFunction) => {
    const result = await validationPipe(validationScheme, {...req.body, ...req.params});
    if(typeof result != 'boolean') {
        console.log(result)
        return res.status(400).json(...result)
    }
    next();
    return true;
}