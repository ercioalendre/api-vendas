import { getCustomRepository } from "typeorm";
import ProductRepository from "@ProductsRepositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import redisCache from "@shared/cache/RedisCache";

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError(
        "The product you were trying to delete doesn't exist.",
      );
    }

    await productRepository.delete(id);

    redisCache.invalidate("api-vendas-PRODUCT_LIST");
  }
}

export default new DeleteProductService();
