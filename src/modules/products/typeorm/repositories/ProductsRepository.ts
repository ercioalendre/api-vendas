import { EntityRepository, Repository, In } from "typeorm";
import Product from "@ProductsEntities/ProductEntity";

interface IFindProducts {
  id: string;
}

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

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const productsExists = this.find({
      where: {
        id: In(productIds),
      },
    });
    return productsExists;
  }
}
