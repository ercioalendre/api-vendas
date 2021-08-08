import { Request, Response } from "express";
import SendForgottenPassword from "@UsersServices/password/SendForgottenPassword";

export default class ForgottenPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgottenPasswordToEmail = new SendForgottenPassword();

    await sendForgottenPasswordToEmail.execute({
      email,
    });

    return res.status(204).json();
  }
}
