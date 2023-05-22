import express from "express";
import { login, register } from "../controllers/auth.controller";
import { validationMiddleware } from "../middleware/validation.middleware";
import { UserDto } from "../dto/user";

const router = express.Router();

router.post('/auth/register', express.json(), validationMiddleware(UserDto), register)
router.post('/auth/login', express.json(), validationMiddleware(UserDto), login)

export default router;