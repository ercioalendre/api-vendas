import { getCustomRepository } from "typeorm";
import Customer from "@CustomersEntities/CustomerEntity";
import CustomersRepository from "@CustomersRepositories/CustomersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  customerName: string;
  customerEmail: string;
}

class CreateCustomerService {
  public async execute({
    customerName,
    customerEmail,
  }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(customerEmail);

    if (emailExists) {
      throw new AppError("A customer with that email address already exists.");
    }

    const customer = customersRepository.create({
      name: customerName,
      email: customerEmail,
    });

    await customersRepository.save(customer);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, updated_at, ...customerData } = customer;

    return customerData as Customer;
  }
}

export const createCustomerService = new CreateCustomerService();
export default createCustomerService;
