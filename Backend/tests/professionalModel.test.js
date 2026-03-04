const SequelizeMock = require("sequelize-mock");
describe("Professional Model Test", () => {
  const dbMock = new SequelizeMock();
  const ProfessionalMock = dbMock.define("Professionals", {
    id: 1,
    name: "Dr. John",
    specialization: "Psychiatry",
    location: "Colombo",
    education: "MBBS",
    officeHours: "9AM-5PM",
    fees: 2000,
    bio: "Mental health specialist"
  });

  it("should create professional record", async () => {

    const professional = await ProfessionalMock.create({
      name: "Dr. John",
      specialization: "Psychiatry"
    });

    expect(professional.name).toBe("Dr. John");
    expect(professional.specialization).toBe("Psychiatry");
    expect(typeof professional.name).toBe("string");
  });
  it("should store professional fees correctly", async () => {

    const professional = await ProfessionalMock.create({
      fees: 2000
    });

    expect(professional.fees).toBeGreaterThan(0);
    expect(typeof professional.fees).toBe("number");
  });
});