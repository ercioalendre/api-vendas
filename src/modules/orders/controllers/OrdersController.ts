import { Request, Response } from "express";
import showOrderService from "@OrdersServices/ShowOrderService";
import createOrderService from "@OrdersServices/CreateOrderService";

class ProductsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const order = await showOrderService.execute({ id });
    return res.json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;
    const newOrder = await createOrderService.execute({
      customer_id,
      products,
    });
    return res.json(newOrder);
  }
}

export const productsController = new ProductsController();
export default productsController;
