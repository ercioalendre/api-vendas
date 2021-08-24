import { getCustomRepository } from "typeorm";
import ProductRepository from "@ProductsRepositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";

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

    const redisCache = new RedisCache();

    redisCache.invalidate("api-vendas-PRODUCT_LIST");
  }
}

export const deleteProductService = new DeleteProductService();
export default deleteProductService;
