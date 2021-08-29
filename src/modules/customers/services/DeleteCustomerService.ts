import { getCustomRepository } from "typeorm";
import CustomersRepository from "@CustomersRepositories/CustomersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  customerId: string;
}

class DeleteCustomerService {
  public async execute({ customerId }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findOne(customerId);

    if (!customer) {
      throw new AppError(
        "The customer you were trying to delete doesn't exist.",
      );
    }

    await customersRepository.delete(customerId);
  }
}

export default new DeleteCustomerService();
