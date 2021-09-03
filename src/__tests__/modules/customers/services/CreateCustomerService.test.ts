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
  // await connection.clear();
});

describe("Create customer service tests", () => {
  it("should create a new customer", () => {
    const customer = Promise.resolve(
      createCustomerService.execute({
        customerName: "Testing",
        customerEmail: "testing@apivendas.com.br",
      }),
    );

    return expect(customer).resolves.toHaveProperty("id");
  });

  it("should not create a new customer: invalid email", () => {
    const customer = Promise.resolve(
      createCustomerService.execute({
        customerName: "Testing [2]",
        customerEmail: "",
      }),
    );

    return expect(customer).rejects.toBeInstanceOf(AppError);
  });

  it("should not create a new customer: email already exists", () => {
    async () => {
      await createCustomerService.execute({
        customerName: "Testing [3]",
        customerEmail: "testing@apivendas.com.br",
      });
    };

    const customer = Promise.resolve(
      createCustomerService.execute({
        customerName: "Testing [3]",
        customerEmail: "testing@apivendas.com.br",
      }),
    );

    return expect(customer).rejects.toBeInstanceOf(AppError);
  });
});
