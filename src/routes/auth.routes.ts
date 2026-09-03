import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

//Endpoint: POST /api/auth/register
router.post("/register", authController.registerUser);

//Endpoint: POST /api/auth/login
router.post("/login", authController.loginUser);

export default router;
