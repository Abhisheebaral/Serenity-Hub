import { Appointments } from "../Model/appointmentModel.js";
import { Professionals } from "../Model/professionalModel.js";

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

    const newAppointment = await Appointments.create({
      customerId,
      professionalId,
      appointmentDate,
      appointmentTime,
      description,
    });

    res.status(201).json({ success: true, appointment: newAppointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

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

    res.json({
      appointments
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};
export const updateAppointment = async (req, res) => {
  try {

    const { id } = req.params;

    const appointment = await Appointments.findByPk(id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    await appointment.update({
      professionalId: req.body.professionalId ?? appointment.professionalId,
      appointmentDate: req.body.appointmentDate ?? appointment.appointmentDate,
      appointmentTime: req.body.appointmentTime ?? appointment.appointmentTime,
      status: req.body.status ?? appointment.status,
      description: req.body.description ?? appointment.description
    });

    res.json({
      success: true,
      message: "Appointment updated successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};