// File: Controller/authController.js
import { Customers } from "../Model/userModel.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    // Debug: log what is received
    //console.log("Login body received:", req.body);

    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send({ message: "Email and password required" });

    // Find user by email
    const user = await Customers.findOne({ where: { customerEmail: email } });

    //console.log("User found in DB:", user); // Debug

    // Compare plain password
    if (!user || user.customerPassword !== password) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.customerEmail },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token and user info to frontend
    res.status(200).send({
      message: "Login successful",
      access_token: token,
      user: {
        id: user.id,
        name: user.customerName,
        email: user.customerEmail,
        username: user.customerUsername,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
};
