import { getCustomRepository } from "typeorm";
import ProductRepository from "@ProductsRepositories/ProductsRepository";
import Product from "@ProductsEntities/ProductEntity";
import RedisCache from "@shared/cache/RedisCache";

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      "api-vendas-PRODUCT_LIST",
    );

    if (!products) {
      products = await productRepository.find();

      await redisCache.save("api-vendas-PRODUCT_LIST", products);
    }

    return products;
  }
}

export const listProductService = new ListProductService();
export default listProductService;
