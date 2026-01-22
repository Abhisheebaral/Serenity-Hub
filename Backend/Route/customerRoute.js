// File: Route/customerRoute.js
import express from "express";
import {
  deleteById,
  getAll,
  getById,
  save,
  updateById,
} from "../Controller/customerController.js";

export const router = express.Router();

// --- Customer CRUD routes ---
router.get("/", getAll);
router.post("/", save);
router.get("/:id", getById);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);
