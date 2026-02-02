import express from "express";
import { login } from "../Controller/authController.js";

export const authRouter = express.Router();

// POST /auth/login
authRouter.post("/login", login);
