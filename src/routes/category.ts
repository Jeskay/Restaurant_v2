import express from "express";
import { databaseService } from "../services";
import {auth} from '../middleware/auth.middleware'
import { deleteCategory, getCategories, postCategory } from "../controllers/category.controller";

const router = express.Router();

router.get('/category', getCategories);
router.post('/category/:name', auth, postCategory);
router.delete('/category/:name', auth, deleteCategory);

export default router;