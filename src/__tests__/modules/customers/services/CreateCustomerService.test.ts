import "reflect-metadata";
import connection from "@tests/TypeORM.connection";
import createCustomerService from "@CustomersServices/CreateCustomerService";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

describe("Create customer service tests", () => {
  it("should create a new customer", async () => {
    const customer = await createCustomerService.execute({
      customerName: "Ercio Alendre",
      customerEmail: "ercio.alendre@gmail.com",
    });
    expect(customer).toHaveProperty("id");
  });
});
