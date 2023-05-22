import { Request, Response } from "express"
import { cloudinaryService, databaseService } from "../services"
import fileUpload from "express-fileupload";

export const getDishesByCategory = async (req: Request, res: Response) => {
    try {
        const dishes = await databaseService.getDishes(req.params.category)
        res.status(200).json(dishes);
    } catch(err){
        return res.status(500).send("Server Error")
    }
}

export const postDish = async (req: Request, res: Response) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0 || req.files.image instanceof Array)
        return res.status(400).send('No images were uploaded');
        const picture: fileUpload.UploadedFile = req.files.image;
        const image_url = await cloudinaryService.uploadImage(picture.data);
        const {dish, description, category} = req.body;
        const result = await databaseService.createDish({
            name: dish,
            description,
            image: image_url,
            category: {
                connect: {
                    name: category
                }
            }
        })
        res.status(200).json(result);
    } catch(err){
        console.error(err)
        return res.status(500).send("Server Error")
    }
}

export const updateDish = async (req: Request, res: Response) => {
    try {
        const { category, description } = req.body;
        let image_url = undefined;
        if(!(!req.files || Object.keys(req.files).length === 0 || req.files.image instanceof Array)){
            image_url = await cloudinaryService.updateImage(req.files.image.data);
        }
        console.log(image_url);
        const result = await databaseService.updateDish(req.params.name, {
            categoryName: category,
            image: image_url,
            description
        })
        res.status(200).json(result);
    } catch(err){
        return res.status(500).send("Server Error")
    }
}

export const deleteDish = async (req: Request, res: Response) => {
    try {
        const result = await databaseService.deleteDish(req.params.name);
        if(result.image)
            await cloudinaryService.deleteImage(result.image);
        res.status(200).json(result);
    } catch(err){
        return res.status(500).send("Server Error")
    }
}

export const getDishByName = async (req: Request, res: Response) => {
    try {
        const dish = await databaseService.getDish(req.params.name)
        res.status(200).json(dish);
    } catch(err){
        return res.status(500).send("Server Error")
    }
}