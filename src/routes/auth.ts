import express from "express";
import { login, register } from "../controllers/auth.controller";

const router = express.Router();

router.post('/auth/register', express.json(), register)
router.post('/auth/login', express.json(), login)

export default router;