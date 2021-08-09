import { Request, Response } from "express";
import listUserService from "@UsersServices/ListUserService";
import createUserService from "@UsersServices/CreateUserService";

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await listUserService.execute();

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}

export const usersController = new UsersController();
export default usersController;
