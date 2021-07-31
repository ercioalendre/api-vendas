import { getCustomRepository } from "typeorm";
import { ProductRepository } from "@repositories/ProductsRepository";
import Product from "@entities/Product";
import AppError from "@shared/errors/AppError";

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
      throw new AppError("The product you were looking for wasn't found.");
    }

    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError("A product with that name already exists.");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
