const SequelizeMock = require("sequelize-mock");
describe("DailyCheckin Model Test", () => {

  const dbMock = new SequelizeMock();

  const CustomersMock = dbMock.define("Customers", {
    id: 1,
    customerName: "Test User"
  });
  const DailyCheckinMock = dbMock.define("DailyCheckin", {
    id: 1,
    customerId: 1,
    date: "2026-01-01",
    mood: 4,
    sleepMinutes: 60,
    exerciseMinutes: 30,
    meditationMinutes: 20,
    gratitude: true
  });

  it("should create a daily checkin record", async () => {

    const checkin = await DailyCheckinMock.create({
      customerId: 1,
      date: "2026-01-01",
      mood: 4
    });

    expect(checkin.customerId).toBe(1);
    expect(checkin.date).toBe("2026-01-01");
    expect(typeof checkin.mood).toBe("number");
  });

  it("should store wellness activity values", async () => {

    const checkin = await DailyCheckinMock.create({
      sleepMinutes: 60,
      exerciseMinutes: 30,
      meditationMinutes: 20,
      gratitude: true
    });

    expect(checkin.sleepMinutes).toBeGreaterThanOrEqual(0);
    expect(checkin.gratitude).toBe(true);
  });

});