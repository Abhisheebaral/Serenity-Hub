import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { bookAppointment, getAppointments, cancelAppointment } from "../Controller/appointmentController.js";

const router = express.Router();

// BOOK APPOINTMENT
router.post("/", authMiddleware, bookAppointment);

// GET APPOINTMENTS
router.get("/", authMiddleware, getAppointments);

// CANCEL APPOINTMENT
router.patch("/:id/cancel", authMiddleware, cancelAppointment);

export default router;