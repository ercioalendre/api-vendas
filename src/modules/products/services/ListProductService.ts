import { getCustomRepository } from "typeorm";
import { ProductRepository } from "@repositories/ProductsRepository";
import Product from "@ProductsEntities";

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = productRepository.find();

    return products;
  }
}

export default ListProductService;
