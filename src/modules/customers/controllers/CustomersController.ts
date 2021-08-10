import { Request, Response } from "express";
import listCustomersService from "@CustomersServices/ListCustomersService";
import showCustomerService from "@CustomersServices/ShowCustomerService";
import createCustomerService from "@CustomersServices/CreateCustomerService";
import updateCustomerService from "@CustomersServices/UpdateCustomerService";
import deleteCustomerService from "@CustomersServices/DeleteCustomerService";

class CustomersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const customers = await listCustomersService.execute();
    return res.json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { customerId } = req.params;
    const customer = await showCustomerService.execute({ customerId });
    return res.json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customerName, customerEmail } = req.body;
    const customer = await createCustomerService.execute({
      customerName,
      customerEmail,
    });
    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { newCustomerName, newCustomerEmail } = req.body;
    const { customerId } = req.params;
    const customer = await updateCustomerService.execute({
      customerId,
      newCustomerName,
      newCustomerEmail,
    });
    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { customerId } = req.params;
    await deleteCustomerService.execute({ customerId });
    return res.json([]);
  }
}

export const customersController = new CustomersController();
export default customersController;
