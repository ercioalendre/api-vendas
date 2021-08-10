import { getCustomRepository } from "typeorm";
import Customer from "@CustomersEntities/CustomerEntity";
import CustomersRepository from "@CustomersRepositories/CustomersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  customerId: string;
}

class ShowCustomerService {
  public async execute({ customerId }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError("Customer was not found.", 401);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, updated_at, ...customerData } = customer;

    return customerData as Customer;
  }
}

export const showCustomerService = new ShowCustomerService();
export default showCustomerService;
