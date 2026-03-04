import { Appointments } from "../Model/appointmentModel.js";
import { Professionals } from "../Model/professionalModel.js";
import { Op } from "sequelize";

/* ======================
   BOOK APPOINTMENT
====================== */
export const bookAppointment = async (req, res) => {
  try {
    const customerId = req.user.id;

    const { professionalId, appointmentDate, appointmentTime, description } = req.body;

    if (!professionalId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const conflict = await Appointments.findOne({
      where: { professionalId, appointmentDate, appointmentTime }
    });

    if (conflict) {
      return res.status(400).json({ message: "Professional is already booked for this slot" });
    }

    const newAppointment = await Appointments.create({
      customerId,
      professionalId,
      appointmentDate,
      appointmentTime,
      description,
      status: "Pending"
    });

    res.status(201).json({ success: true, appointment: newAppointment });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
   GET APPOINTMENTS
====================== */
export const getAppointments = async (req, res) => {
  try {
    const customerId = req.user.id;

    const appointments = await Appointments.findAll({
      where: { customerId },
      include: [
        {
          model: Professionals,
          as: "professional",
          attributes: ["id", "name", "specialization", "location", "image"]
        }
      ],
      order: [
        ["appointmentDate", "ASC"],
        ["appointmentTime", "ASC"]
      ]
    });

    res.json({ appointments });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
   UPDATE APPOINTMENT
====================== */
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointments.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const { professionalId, appointmentDate, appointmentTime, status, description } = req.body;

    if (professionalId && appointmentDate && appointmentTime) {
      const conflict = await Appointments.findOne({
        where: {
          professionalId,
          appointmentDate,
          appointmentTime,
          id: { [Op.ne]: id }
        }
      });

      if (conflict) {
        return res.status(400).json({ message: "Professional is already booked for this slot" });
      }
    }

    await appointment.update({
      professionalId: professionalId ?? appointment.professionalId,
      appointmentDate: appointmentDate ?? appointment.appointmentDate,
      appointmentTime: appointmentTime ?? appointment.appointmentTime,
      status: status ?? appointment.status,
      description: description ?? appointment.description
    });

    res.json({ success: true, message: "Appointment updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
   CANCEL APPOINTMENT
====================== */
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const customerId = req.user.id;

    const appointment = await Appointments.findOne({
      where: { id, customerId }
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status === "Cancelled") {
      return res.status(400).json({ message: "Appointment is already cancelled" });
    }

    await appointment.update({ status: "Cancelled" });

    res.json({ success: true, message: "Appointment cancelled successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};