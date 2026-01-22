import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { getDashboardStats } from "../Controller/statsController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, getDashboardStats);

export default router;
