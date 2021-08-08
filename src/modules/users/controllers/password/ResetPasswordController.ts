import { Request, Response } from "express";
import ResetPasswordService from "@UsersServices/password/ResetPasswordService";

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      token,
      password,
    });

    return res.status(204).json();
  }
}
