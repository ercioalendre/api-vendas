import { getCustomRepository } from "typeorm";
import { ProductRepository } from "@ProductsRepositories";
import AppError from "@shared/errors/AppError";

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
  }
}

export const deleteProductService = new DeleteProductService();
export default deleteProductService;
