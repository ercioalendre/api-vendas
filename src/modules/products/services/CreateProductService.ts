import { getCustomRepository } from "typeorm";
import ProductRepository from "@ProductsRepositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "@ProductsEntities/ProductEntity";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError("A product with that name already exists.");
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}

export const createProductService = new CreateProductService();
export default createProductService;
