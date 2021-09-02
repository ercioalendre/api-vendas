import "reflect-metadata";
import connection from "@tests/TypeORM.connection";
import createCustomerService from "@CustomersServices/CreateCustomerService";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";

beforeAll(async () => {
  await connection.create();
  await connection.clear();
});

afterAll(async () => {
  await connection.clear();
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

describe("Create customer service tests", () => {
  // it("should create a new customer", async () => {
  //   const customer = await createCustomerService.execute({
  //     customerName: "Test Customer",
  //     customerEmail: "testcustomer@apivendas.com",
  //   });
  //   expect(customer).toHaveProperty("id");
  // });

  it("should not create a new customer", async () => {
    async function createCustomer() {
      await createCustomerService.execute({
        customerName: "Test [2] Customer",
        customerEmail: "testcustomer@apivendas.com",
      });
    }

    expect(createCustomer()).resolves.toHaveProperty("id");

    // expect(createCustomer()).resolves.toHaveProperty("id");
  });
});
