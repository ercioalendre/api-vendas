import { getCustomRepository } from "typeorm";
import ProductRepository from "@ProductsRepositories/ProductsRepository";
import Product from "@ProductsEntities/ProductEntity";

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = productRepository.find();

    return products;
  }
}

export const listProductService = new ListProductService();
export default listProductService;
