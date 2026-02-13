import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { verifyAdmin } from "../Middleware/adminMiddleware.js";

import {
  getDashboardStats,
  getAllUsers,
  deleteUserById,
  getAllAppointments,
  updateAppointmentStatus, 
} from "../Controller/adminController.js";

const router = express.Router();

// Protect all routes for admin only
router.use(authMiddleware);
router.use(verifyAdmin);

// Dashboard stats
router.get("/stats", getDashboardStats);

// Users
router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUserById);

// Appointments
router.get("/appointments", getAllAppointments);
router.patch("/appointments/:id", updateAppointmentStatus); 

export default router;
