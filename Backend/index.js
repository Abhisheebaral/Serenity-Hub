

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// import { connection } from "./Database/db.js";
// import { router as customerRouter } from "./Route/customerRoute.js";
// import { save } from "./Controller/customerController.js";
// import { authRouter } from "./Route/authRoute.js";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// /* ---------------- MIDDLEWARE ---------------- */
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// app.use(express.json());

// /* ---------------- DATABASE ---------------- */
// connection();

// /* ---------------- ROUTES ---------------- */
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// app.use("/api/customer", customerRouter);
// app.use("/auth", authRouter);

// // frontend registration endpoint
// app.post("/users", save);

// /* ---------------- SERVER ---------------- */
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// 🔹 DB (named imports only)
import { sequelize, connection } from "./Database/db.js";   // ✅ fixed

// 🔹 Models (load them to register with Sequelize)
import "./Model/userModel.js";
import "./Model/checkinModel.js";

// 🔹 Routes
import { router as customerRouter } from "./Route/customerRoute.js";
import { authRouter } from "./Route/authRoute.js";
import checkinRoute from "./Route/checkinRoute.js";
import statsRoute from "./Route/statsRoute.js";

// 🔹 Controllers
import { save } from "./Controller/customerController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* ---------------- DATABASE ---------------- */
await connection(); // connect to DB

// 🔥 SYNC DATABASE (creates tables if not exist)
await sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("DB sync failed:", err));

/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/customer", customerRouter);
app.use("/auth", authRouter);

// frontend registration endpoint
app.post("/users", save);

// 🔥 DASHBOARD ROUTES
app.use("/api/checkin", checkinRoute);
app.use("/api/stats", statsRoute);

/* ---------------- SERVER ---------------- */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
