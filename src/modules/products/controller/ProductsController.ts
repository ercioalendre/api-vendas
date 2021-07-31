import { Request, Response } from "express";
import ListProductService from "@ProductServices/ListProductService";
import ShowProductService from "@ProductServices/ShowProductService";
import CreateProductService from "@ProductServices/CreateProductService";
import UpdateProductService from "@ProductServices/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();
    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showProducts = new ShowProductService();
    const product = await showProducts.execute({ id });
    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });
    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({ id, name, price, quantity });
    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });
    return res.json([]);
  }
}
