import { Request, Response } from "express";
import createSessionsService from "@UsersServices/CreateSessionsService";

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await createSessionsService.execute({
      email,
      password,
    });

    return res.json(user);
  }
}

export const sessionsController = new SessionsController();
export default sessionsController;
