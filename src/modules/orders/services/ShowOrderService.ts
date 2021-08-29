import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "@OrdersEntities/OrderEntity";
import OrdersRepository from "@OrdersRepositories/OrdersRepository";

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError("The order you were looking for wasn't found.");
    }

    return order;
  }
}

export default new ShowOrderService();
