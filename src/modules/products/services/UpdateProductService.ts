import { getCustomRepository } from "typeorm";
import ProductRepository from "@ProductsRepositories/ProductsRepository";
import Product from "@ProductsEntities/ProductEntity";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError("The product you were trying to edit wasn't found.");
    }

    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError("A product with that name already exists.");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    const redisCache = new RedisCache();

    redisCache.invalidate("api-vendas-PRODUCT_LIST");

    return product;
  }
}

export const updateProductService = new UpdateProductService();
export default updateProductService;
