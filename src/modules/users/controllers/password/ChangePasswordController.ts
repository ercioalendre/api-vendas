import { Request, Response } from "express";
import ChangePasswordService from "@UsersServices/password/ChangePasswordService";

export default class ChangePasswordController {
  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id || "";
    const { currentPassword, newPassword, newPasswordConfirmation } = req.body;

    const changePassword = new ChangePasswordService();

    const user = await changePassword.execute({
      userId,
      currentPassword,
      newPassword,
      newPasswordConfirmation,
    });

    return res.json(user);
  }
}
