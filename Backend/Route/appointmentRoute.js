import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { bookAppointment, getAppointments } from "../Controller/appointmentController.js";

const router = express.Router();

// BOOK APPOINTMENT
router.post("/", authMiddleware, bookAppointment);

// GET APPOINTMENTS
router.get("/", authMiddleware, getAppointments);

export default router;


