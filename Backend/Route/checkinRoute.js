import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import {
  getTodayCheckin,
  updateTodayCheckin,
} from "../Controller/checkinController.js";

const router = express.Router();

router.get("/today", authMiddleware, getTodayCheckin);
router.patch("/today", authMiddleware, updateTodayCheckin);

export default router;
