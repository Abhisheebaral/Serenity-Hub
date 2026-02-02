import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { verifyAdmin } from "../Middleware/adminMiddleware.js";
import { getAll, deleteById } from "../Controller/customerController.js";

const router = express.Router();

router.use(authMiddleware); // verify JWT
router.use(verifyAdmin);    // only admin

router.get("/users", getAll);
router.delete("/user/:id", deleteById);

export default router;
