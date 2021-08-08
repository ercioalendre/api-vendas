import { Request, Response } from "express";
import ResetPasswordService from "@UsersServices/password/ResetPasswordService";

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, newPassword } = req.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      token,
      newPassword,
    });

    return res.status(204).json();
  }
}
