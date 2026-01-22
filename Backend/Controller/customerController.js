// File: Controller/customerController.js
import { Customers } from "../Model/userModel.js";

import jwt from "jsonwebtoken";

// -----------------------------
// Get all customers
// -----------------------------
export const getAll = async (req, res) => {
  try {
    const customer = await Customers.findAll();
    res.status(200).send({ data: customer, message: "Data fetched successfully" });
  } catch (e) {
    console.error("Error fetching customers:", e);
    res.status(500).send({ message: e.message });
  }
};

// -----------------------------
// Register a new customer
// -----------------------------
export const save = async (req, res) => {
  try {
    const body = req.body;
    console.log("Received registration data:", body);

    // Validate required fields
    const requiredFields = ["name", "username", "email", "phone", "password"];
    for (let field of requiredFields) {
      if (!body[field]) {
        return res.status(400).send({ message: `${field} is required` });
      }
    }

    // Check if email or username already exists
    const existingEmail = await Customers.findOne({ where: { customerEmail: body.email } });
    if (existingEmail) {
      return res.status(409).send({ message: "Email already in use" });
    }

    const existingUsername = await Customers.findOne({ where: { customerUsername: body.username } });
    if (existingUsername) {
      return res.status(409).send({ message: "Username already in use" });
    }

    // Create new customer (plain password)
    const user = await Customers.create({
      customerName: body.name,
      customerUsername: body.username,
      customerEmail: body.email,
      customerContactNo: body.phone,
      customerPassword: body.password, // ✅ store plain password
      customerAddress: body.address || null,
    });

    res.status(201).send({ message: "Customer registered successfully", data: user });
  } catch (e) {
    console.error("Error in save:", e);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
};

// -----------------------------
// Customer login
// -----------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const user = await Customers.findOne({ where: { customerEmail: email } });
    if (!user || user.customerPassword !== password) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.customerEmail },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

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
  } catch (e) {
    console.error("Error in login:", e);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
};

// -----------------------------
// Get customer by ID
// -----------------------------
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Customers.findOne({ where: { id } });

    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send({ data: user, message: "Fetched successfully" });
  } catch (e) {
    console.error("Error fetching user by ID:", e);
    res.status(500).send({ message: e.message });
  }
};

// -----------------------------
// Update customer by ID
// -----------------------------
export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const user = await Customers.findOne({ where: { id } });
    if (!user) return res.status(404).send({ message: "User not found" });

    // Update fields if provided
    user.customerName = body.name || user.customerName;
    user.customerUsername = body.username || user.customerUsername;
    user.customerEmail = body.email || user.customerEmail;
    user.customerContactNo = body.phone || user.customerContactNo;
    user.customerAddress = body.address || user.customerAddress;

    // Update password directly (plain)
    if (body.password) {
      user.customerPassword = body.password; // ✅ store plain password
    }

    await user.save();
    res.status(200).send({ data: user, message: "User updated successfully" });
  } catch (e) {
    console.error("Error updating user:", e);
    res.status(500).send({ message: e.message });
  }
};

// -----------------------------
// Delete customer by ID
// -----------------------------
export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Customers.findOne({ where: { id } });
    if (!user) return res.status(404).send({ message: "User not found" });

    await user.destroy();
    res.status(200).send({ data: user, message: "User deleted successfully" });
  } catch (e) {
    console.error("Error deleting user:", e);
    res.status(500).send({ message: e.message });
  }
};
