import { DailyCheckin } from "../Model/checkinModel.js";
import { Customers } from "../Model/userModel.js";
import { Appointments } from "../Model/appointmentModel.js";
import { Sequelize } from "sequelize";
import { Professionals } from "../Model/professionalModel.js";

/* =============================
   DASHBOARD STATS
============================= */

export const getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await Customers.count();

    const today = new Date().toISOString().split("T")[0];

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

/* =============================
   USERS
============================= */

export const getAllUsers = async (req, res) => {
  try {
    const users = await Customers.findAll({
      attributes: [
        "id",
        "customerName",
        "customerEmail",
        "customerContactNo",
        "customerRole"
      ],
      order: [["id", "ASC"]],
    });

    res.json(users);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

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

/* =============================
   APPOINTMENTS
============================= */

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.findAll({
      include: [
        {
          model: Professionals,
          as: "professional",
          attributes: ["id", "name", "specialization", "location", "image"]
        },
        {
          model: Customers,
          as: "customer",
          attributes: ["id", "customerName"]
        }
      ],

      order: [
        ["appointmentDate", "ASC"],
        ["appointmentTime", "ASC"]
      ]
    });

    const result = appointments.map((app, index) => ({
      id: app.id,
      serial: index + 1,

      appointmentDate: app.appointmentDate,
      appointmentTime: app.appointmentTime,
      description: app.description,
      status: app.status || "Pending",

      customerName:
        app.customer?.customerName ||
        `User ${app.customerId}`,

      professional: app.professional || {}
    }));

   res.json({
  appointments: result
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* Update Appointment Status */

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointments.findByPk(id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    await appointment.update({ status });

    res.json({
      message: "Appointment status updated",
      appointment
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =============================
   PROFESSIONALS
============================= */

export const addProfessional = async (req, res) => {
  try {
    const professional = await Professionals.create(req.body);

    res.status(201).json({
      success: true,
      professional
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await Professionals.findAll({
      order: [["id", "ASC"]],
    });

    res.json(professionals);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfessionalById = async (req, res) => {
  try {
    const { id } = req.params;

    const professional = await Professionals.findByPk(id);

    if (!professional) {
      return res.status(404).json({
        message: "Professional not found"
      });
    }

    res.json(professional);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfessional = async (req, res) => {
  try {
    const { id } = req.params;

    const professional = await Professionals.findByPk(id);

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found"
      });
    }

    await professional.update(req.body);

    res.json({
      success: true,
      message: "Professional updated successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const deleteProfessional = async (req, res) => {
  try {
    const { id } = req.params;

    const professional = await Professionals.findByPk(id);

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found"
      });
    }

    await Professionals.destroy({
      where: { id }
    });

    res.json({
      success: true,
      message: "Professional deleted successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};