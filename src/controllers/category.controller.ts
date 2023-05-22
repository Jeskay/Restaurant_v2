import { Request, Response } from "express"
import { databaseService } from "../services";

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await databaseService.getCategories();
        res.status(200).json(categories);
    } catch(err) {
        res.status(500).send("Internal Server Error")
    }
}

export const postCategory = async (req: Request, res: Response) => {
    try {
        const result = await databaseService.createCategory(req.params.name);        
        res.status(201).json(result);
    } catch(err) {
        res.status(500).send("Internal Server Error")
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        await databaseService.deleteCategory(req.params.name)
        res.status(200);
    } catch(err) {
        res.status(500).send("Internal Server Error")
    }
}