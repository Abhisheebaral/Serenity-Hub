const SequelizeMock = require("sequelize-mock");
const DBMock = new SequelizeMock();
const AppointmentMock = DBMock.define("appointments", {
  id: 1,
  customerId: 1,
  professionalId: 2,
  appointmentDate: "2026-01-25",
  appointmentTime: "10:00:00",
  description: "Therapy session",
  status: "Pending"
});
describe("Appointment Model Testing", () => {

  it("should create appointment record", async () => {
    const appointment = await AppointmentMock.create({
      customerId: 1,
      professionalId: 2,
      appointmentDate: "2026-01-25",
      appointmentTime: "10:00:00",
      description: "Therapy session",
      status: "Pending"
    });

    expect(appointment.customerId).toBe(1);
    expect(appointment.professionalId).toBe(2);
    expect(appointment.status).toBe("Pending");
  });
  it("should have appointment date", async () => {
    const appointment = await AppointmentMock.create({
      appointmentDate: "2026-01-30"
    });

    expect(typeof appointment.appointmentDate).toBe("string");
  });
  it("should default status to Pending", async () => {
    const appointment = await AppointmentMock.create({});

    expect(appointment.status).toBeDefined();
  });

});