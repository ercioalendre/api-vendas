import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "@CustomersEntities/CustomerEntity";
import CustomersRepository from "@CustomersRepositories/CustomersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("A customer with that email address already exists.");
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, updated_at, ...customerProfileData } = customer;

    return customerProfileData as Customer;
  }
}

export const createCustomerService = new CreateCustomerService();
export default createCustomerService;
