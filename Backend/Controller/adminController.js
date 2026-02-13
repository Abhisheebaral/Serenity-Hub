// src/Controller/adminController.js
import { DailyCheckin } from "../Model/checkinModel.js";
import { Customers } from "../Model/userModel.js";
import { Appointments } from "../Model/appointmentModel.js";
import { Sequelize } from "sequelize";

// ---------------- DASHBOARD STATS ----------------
export const getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await Customers.count();

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const todayAppointments = await Appointments.count({
      where: { appointmentDate: today },
    });

    const activeUsers = await DailyCheckin.count({
      where: { date: today },
      distinct: true,
      col: "customerId",
    });

    const pendingAppointments = await Appointments.count({
      where: {
        appointmentDate: { [Sequelize.Op.gt]: today },
      },
    });

    res.json({
      totalCustomers,
      todayAppointments,
      activeUsers,
      pendingAppointments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- USERS ----------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await Customers.findAll({
      attributes: ["id", "customerName", "customerEmail", "customerContactNo", "customerRole"], // <-- added phone
      order: [["id", "ASC"]],
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user by admin
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await Customers.destroy({ where: { id } });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- APPOINTMENTS ----------------
// Get all appointments for admin with customer names (no foreign key)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.findAll({
      order: [["appointmentDate", "ASC"], ["appointmentTime", "ASC"]],
    });

    // Manually map customer IDs to names
    const customers = await Customers.findAll({ attributes: ["id", "customerName"] });
    const customerMap = {};
    customers.forEach(c => {
      customerMap[c.id] = c.customerName;
    });

    const mappedAppointments = appointments.map((app, index) => ({
      ...app.dataValues,
      serial: index + 1,
      customerName: customerMap[app.customerId] || `User ${app.customerId}`,
      status: app.status || "Pending",
    }));

    res.json(mappedAppointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update appointment status (approve/confirm)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointments.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: "Appointment status updated", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
