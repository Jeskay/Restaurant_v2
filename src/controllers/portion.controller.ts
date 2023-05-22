import { Request, Response } from "express"
import { databaseService } from "../services"
import { portionDto } from "../dto/portion";

export const getPortions = async (req: Request, res: Response) => {
    try {
        const portions = await databaseService.getPortions()
        res.status(200).json(portions);
    } catch(err){
        return res.status(500).send("Server Error")
    }
}

export const getPortionsByDish = async (req: Request, res: Response) => {
    try {
        const portions = await databaseService.getPortionsByDish(req.params.dish)
        res.status(200).json(portions);
    } catch(err){
        return res.status(500).send("Server Error")
    }
}

export const postPortionsForDish = async (req: Request, res: Response) => {
    try {
        const portions: portionDto[] = (req.body as portionDto[]).map(p => {
            p.dishName = req.params.name;
            return p;
        });
        const result = await databaseService.createPortions(portions)
        res.status(200).json(result);
    } catch(err){
        return res.status(500).send("Server Error")
    }
}

export const deletePortionById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await databaseService.deletePortion(id)
        res.status(200);
    } catch(err){
        return res.status(500).send("Server Error")
    }
}