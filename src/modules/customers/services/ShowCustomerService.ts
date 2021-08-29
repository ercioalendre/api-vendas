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

    return customer;
  }
}

export default new ShowCustomerService();
