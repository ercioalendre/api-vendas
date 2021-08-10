import { getCustomRepository } from "typeorm";
import { ProductRepository } from "@ProductsRepositories";
import Product from "@ProductsEntities/ProductEntity";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError("The product you were looking for wasn't found.");
    }

    return product;
  }
}

export const showProductService = new ShowProductService();
export default showProductService;
