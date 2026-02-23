import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { sequelize, connection } from "./Database/db.js";
import "./Model/userModel.js";
import "./Model/checkinModel.js";
import "./Model/appointmentModel.js";
import "./Model/professionalModel.js";

import { router as customerRouter } from "./Route/customerRoute.js";
import appointmentRoute from "./Route/appointmentRoute.js";
import { authRouter } from "./Route/authRoute.js";
import checkinRoute from "./Route/checkinRoute.js";
import statsRoute from "./Route/statsRoute.js";
import profileRoute from "./Route/profileRoute.js";
import adminRoute from "./Route/adminRoute.js"; // ✅ admin route

import { save } from "./Controller/customerController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

await connection();
await sequelize.sync({ alter: true }).then(() => console.log("DB synced")).catch(console.error);

app.get("/", (req, res) => res.send("Server is running!"));

// --- Routes ---
app.use("/api/customer", customerRouter);
app.use("/auth", authRouter);
app.use("/api/profile", profileRoute);
app.use("/api/appointments", appointmentRoute);
app.use("/api/checkin", checkinRoute);
app.use("/api/stats", statsRoute);
app.use("/api/admin", adminRoute); // ✅ admin route

app.post("/users", save);

app.listen(port, () => console.log(`Server running on port ${port}`));
