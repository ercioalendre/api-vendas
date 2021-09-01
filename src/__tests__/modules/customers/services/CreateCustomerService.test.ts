import "reflect-metadata";
import connection from "@tests/TypeORM.connection";
import createCustomerService from "@CustomersServices/CreateCustomerService";
import AppError from "@shared/errors/AppError";

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
      customerName: "Test Customer",
      customerEmail: "testcustomer@apivendas.com",
    });
    expect(customer).toHaveProperty("id");
  });

  it("should not create a new customer", async () => {
    await createCustomerService.execute({
      customerName: "Test [2] Customer",
      customerEmail: "testcustomer2@apivendas.com",
    });

    const customer = async () => {
      await createCustomerService.execute({
        customerName: "Test [2] Customer",
        customerEmail: "testcustomer2@apivendas.com",
      });
    };

    console.log(customer);

    // expect(customer).toBeFalsy();

    // expect.assertions(1);
    // try {
    //   customer;
    // } catch (error) {
    //   console.log(error);
    //   expect(error).toEqual(AppError);
    // }
    // expect(1 + 1).toBe(2);
  });
});
