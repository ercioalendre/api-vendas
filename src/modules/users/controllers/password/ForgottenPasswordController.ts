import { Request, Response } from "express";
import sendForgottenPasswordService from "@UsersServices/password/SendForgottenPassword";

class ForgottenPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    await sendForgottenPasswordService.execute({
      email,
    });

    return res.status(204).json();
  }
}

export const forgottenPasswordController = new ForgottenPasswordController();
export default forgottenPasswordController;
