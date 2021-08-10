import { getCustomRepository } from "typeorm";
import Customer from "@CustomersEntities/CustomerEntity";
import CustomersRepository from "@CustomersRepositories/CustomersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  customerId: string;
  newCustomerName: string;
  newCustomerEmail: string;
}

class UpdateCustomerService {
  public async execute({
    customerId,
    newCustomerName,
    newCustomerEmail,
  }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError("Customer was not found.", 401);
    }

    const emailExists = await customersRepository.findByEmail(newCustomerEmail);

    if (emailExists) {
      if (emailExists.id === customerId) {
        throw new AppError("You are already using that email address.");
      } else {
        throw new AppError(
          "The email address you're trying to use has already been taken.",
        );
      }
    }

    if (newCustomerEmail) {
      customer.email = newCustomerEmail;
    }

    if (newCustomerName) {
      customer.name = newCustomerName;
    }

    await customersRepository.save(customer);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, updated_at, ...customerData } = customer;

    return customerData as Customer;
  }
}

export const updateCustomerService = new UpdateCustomerService();
export default updateCustomerService;
