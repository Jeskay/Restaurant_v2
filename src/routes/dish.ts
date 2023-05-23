import express from "express";
import {cloudinaryService, databaseService} from '../services'
import fileUpload from "express-fileupload";
import { deleteDish, getDishByName, getDishesByCategory, postDish, updateDish } from "../controllers/dish.controller";
import {auth} from "../middleware/auth.middleware"

const router = express.Router();

router.get('/dish/:category', getDishesByCategory);
router.get('/dish/:name', getDishByName);
router.post('/dish', auth, postDish);
router.put('/dish/:name', auth, updateDish);
router.delete('/dish/:name', auth, deleteDish);

export default router;