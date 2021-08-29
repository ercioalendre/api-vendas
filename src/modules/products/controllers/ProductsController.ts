import { Request, Response } from "express";
import listProductService from "@ProductsServices/ListProductService";
import showProductService from "@ProductsServices/ShowProductService";
import createProductService from "@ProductsServices/CreateProductService";
import updateProductService from "@ProductsServices/UpdateProductService";
import deleteProductService from "@ProductsServices/DeleteProductService";

class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const products = await listProductService.execute();
    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const product = await showProductService.execute({ id });
    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });
    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });
    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await deleteProductService.execute({ id });
    return res.json([]);
  }
}

export default new ProductsController();
