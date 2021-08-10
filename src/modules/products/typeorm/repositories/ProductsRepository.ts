import { EntityRepository, Repository } from "typeorm";
import Product from "@ProductsEntities/ProductEntity";

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  }
}
