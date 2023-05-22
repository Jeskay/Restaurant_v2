import { Request, Response } from "express"
import { authService } from "../services"

export const login = async (req: Request, res: Response) => {
    try {
        const user = await authService.login(req.body.email, req.body.password);
        res.status(200).send(user);
    } catch(err){
        return res.status(500).send("Server Error")
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).send(user)
    } catch(err){
        return res.status(500).send("Server Error")
    }
}