import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { verifyAdmin } from "../Middleware/adminMiddleware.js";
import { updateAppointment } from "../Controller/appointmentController.js";

import {
  getDashboardStats,
  getAllUsers,
  deleteUserById,
  getAllAppointments,
  updateAppointmentStatus,
  addProfessional,
  getAllProfessionals,
  getProfessionalById,
  updateProfessional,
  deleteProfessional
} from "../Controller/adminController.js";

const router = express.Router();

/*
✅ Admin protected APIs
*/

// Professional Management (Admin Only)
router.post("/professionals", authMiddleware, verifyAdmin, addProfessional);
router.patch("/professionals/:id", authMiddleware, verifyAdmin, updateProfessional);
router.delete("/professionals/:id", authMiddleware, verifyAdmin, deleteProfessional);

// Admin dashboard APIs
router.get("/stats", authMiddleware, verifyAdmin, getDashboardStats);
router.get("/users", authMiddleware, verifyAdmin, getAllUsers);
router.delete("/user/:id", authMiddleware, verifyAdmin, deleteUserById);
router.get("/appointments", authMiddleware, verifyAdmin, getAllAppointments);
router.patch(
  "/appointments/:id",
  authMiddleware,
  verifyAdmin,
  updateAppointment
);

/*
✅ Public professional listing (VERY IMPORTANT)
*/
router.get("/professionals", getAllProfessionals);
router.get("/professionals/:id", getProfessionalById);

export default router;