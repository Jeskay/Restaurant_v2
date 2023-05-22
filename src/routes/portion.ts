import express from 'express';
import { deletePortionById, getPortions, getPortionsByDish, postPortionsForDish } from '../controllers/portion.controller';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/portion', getPortions);
router.get('/portion/:dish', getPortionsByDish)
router.post('/portion/:name', express.json() , auth, postPortionsForDish);
router.delete('/portion/:id', auth, deletePortionById);

export default router;