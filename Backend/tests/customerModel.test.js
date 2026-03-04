const SequelizeMock = require("sequelize-mock");
describe("Customer Model Test", () => {
  const dbMock = new SequelizeMock();
  const CustomerMock = dbMock.define("customers", {
    id: 1,
    customerName: "John Doe",
    customerUsername: "johndoe",
    customerAddress: "Colombo",
    customerContactNo: "0771234567",
    customerEmail: "john@email.com",
    customerPassword: "hashedpassword",
    customerRole: "user"
  });
  it("should create customer record", async () => {

    const customer = await CustomerMock.create({
      customerName: "John Doe",
      customerEmail: "john@email.com"
    });

    expect(customer.customerName).toBe("John Doe");
    expect(customer.customerEmail).toBe("john@email.com");
    expect(typeof customer.customerName).toBe("string");
  });
  it("should store customer role correctly", async () => {

    const customer = await CustomerMock.create({
      customerRole: "admin"
    });

    expect(customer.customerRole).toBeDefined();
    expect(["user", "admin"].includes(customer.customerRole)).toBe(true);
  });
  it("should validate contact number", async () => {
    const customer = await CustomerMock.create({
      customerContactNo: "0771234567"
    });
    expect(customer.customerContactNo.length).toBeGreaterThanOrEqual(10);
  });
});