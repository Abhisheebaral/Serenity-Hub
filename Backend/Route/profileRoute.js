import express from "express";
import { getProfile, updateProfile } from "../Controller/profileController.js";
import authMiddleware from "../Middleware/authMiddleware.js"; 


const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);

export default router;
