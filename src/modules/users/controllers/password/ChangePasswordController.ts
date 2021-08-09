import { Request, Response } from "express";
import { changePasswordService } from "@UsersServices/password/ChangePasswordService";

class ChangePasswordController {
  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id || "";
    const { currentPassword, newPassword, newPasswordConfirmation } = req.body;

    const user = await changePasswordService.execute({
      userId,
      currentPassword,
      newPassword,
      newPasswordConfirmation,
    });

    return res.json(user);
  }
}

export const changePasswordController = new ChangePasswordController();
export default changePasswordController;
