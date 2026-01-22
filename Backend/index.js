// // File: index.js
// import express from "express";
// import dotenv from "dotenv";
// import { connection } from "./Database/db.js";
// import { router } from "./Route/customerRoute.js"; // Your customer routes

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// // Connect to database
// connection();

// // Test route
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// // Customer routes
// app.use("/api/customer", router);

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// import express from "express";
// import dotenv from "dotenv";
// import { connection } from "./Database/db.js";
// import { router as customerRouter } from "./Route/customerRoute.js"; // existing customer routes
// import { save } from "./Controller/customerController.js"; // import the save function

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // Connect to database
// connection();

// // Test route
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// // Customer routes
// app.use("/api/customer", customerRouter);

// // --- Use the same save function for frontend registration ---
// app.post("/users", save);  // ✅ frontend POST /users will now save to DB

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connection } from "./Database/db.js";
import { router as customerRouter } from "./Route/customerRoute.js";
import { save } from "./Controller/customerController.js";
import { authRouter } from "./Route/authRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

/* ---------------- DATABASE ---------------- */
connection();

/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/customer", customerRouter);
app.use("/auth", authRouter);

// frontend registration endpoint
app.post("/users", save);

/* ---------------- SERVER ---------------- */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
