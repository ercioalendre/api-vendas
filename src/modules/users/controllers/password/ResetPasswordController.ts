import { Request, Response } from "express";
import resetPasswordService from "@UsersServices/password/ResetPasswordService";

class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { newPassword } = req.body;
    const { token } = req.params;

    await resetPasswordService.execute({
      token,
      newPassword,
    });

    return res.status(204).json();
  }
}

export default new ResetPasswordController();
