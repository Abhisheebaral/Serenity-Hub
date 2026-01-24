import { Appointments } from "../Model/appointmentModel.js";

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

/* ======================
   GET APPOINTMENTS (OPTIONAL DATE FILTER)
====================== */
export const getAppointments = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { date } = req.query;

    let where = { customerId };
    if (date) where.appointmentDate = date;

    const appointments = await Appointments.findAll({
      where,
      order: [["appointmentDate", "ASC"], ["appointmentTime", "ASC"]],
    });

    res.status(200).json({ success: true, appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
