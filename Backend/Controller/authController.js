import { Customers } from "../Model/userModel.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send({ message: "Email and password required" });

    const user = await Customers.findOne({ where: { customerEmail: email } });

    if (!user || user.customerPassword !== password) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // ✅ Include role in token
    const token = jwt.sign(
      { id: user.id, email: user.customerEmail, role: user.customerRole },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

   res.status(200).send({
  message: "Login successful",
  token: token,
      user: {
        id: user.id,
        name: user.customerName,
        email: user.customerEmail,
        username: user.customerUsername,
        role: user.customerRole, // ✅ send role
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
};
