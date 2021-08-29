import { getCustomRepository } from "typeorm";
import Customer from "@CustomersEntities/CustomerEntity";
import CustomersRepository from "@CustomersRepositories/CustomersRepository";

interface ICustomerPagination {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: null | number;
  next_page: null | number;
  data: Customer[];
}

class ListCustomersService {
  public async execute(): Promise<ICustomerPagination> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as ICustomerPagination;
  }
}

export default new ListCustomersService();
