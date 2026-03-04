const SequelizeMock = require("sequelize-mock");
const jwt = require("jsonwebtoken");

describe("Appointment Controller Test", () => {

  // Mock Appointment Model
  const dbMock = new SequelizeMock();
  const AppointmentMock = dbMock.define("appointments", {
    customerId: 1,
    professionalId: 1,
    appointmentDate: "2026-01-25",
    appointmentTime: "10:00",
    description: "Test appointment",
    status: "Pending"
  });

  it("should create appointment with pending status", async () => {

    const appointment = await AppointmentMock.create({
      customerId: 1,
      professionalId: 1,
      appointmentDate: "2026-01-25",
      appointmentTime: "10:00",
      description: "Test appointment"
    });

    expect(appointment.status).toBe("Pending");
    expect(appointment.customerId).toBe(1);
    expect(typeof appointment.appointmentDate).toBe("string");
  });

});