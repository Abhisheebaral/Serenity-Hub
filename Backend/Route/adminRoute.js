import express from "express";
import multer from "multer";
import path from "path";
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
  deleteProfessional,
  getUserCheckins
} from "../Controller/adminController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post("/upload", authMiddleware, verifyAdmin, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  res.json({ success: true, imageUrl: `/uploads/${req.file.filename}` });
});

router.post("/professionals", authMiddleware, verifyAdmin, addProfessional);
router.patch("/professionals/:id", authMiddleware, verifyAdmin, updateProfessional);
router.delete("/professionals/:id", authMiddleware, verifyAdmin, deleteProfessional);

router.get("/stats", authMiddleware, verifyAdmin, getDashboardStats);
router.get("/users", authMiddleware, verifyAdmin, getAllUsers);
router.delete("/user/:id", authMiddleware, verifyAdmin, deleteUserById);
router.get("/appointments", authMiddleware, verifyAdmin, getAllAppointments);
router.patch("/appointments/:id", authMiddleware, verifyAdmin, updateAppointment);

// ✅ NEW - User checkin history
router.get("/user/:id/checkins", authMiddleware, verifyAdmin, getUserCheckins);

router.get("/professionals", getAllProfessionals);
router.get("/professionals/:id", getProfessionalById);

export default router;