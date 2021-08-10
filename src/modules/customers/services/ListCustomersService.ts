import { getCustomRepository } from "typeorm";
import Customer from "@CustomersEntities/CustomerEntity";
import CustomersRepository from "@CustomersRepositories/CustomersRepository";

class ListCustomersService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = customersRepository.find();

    return customers;
  }
}

export const listCustomersService = new ListCustomersService();
export default listCustomersService;
