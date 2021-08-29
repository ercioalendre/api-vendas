import { Request, Response } from "express";
import showUserProfileService from "@UsersServices/profile/ShowUserProfileService";
import updateUserProfileService from "@UsersServices/profile/UpdateUserProfileService";

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id || "";

    const user = await showUserProfileService.execute({ userId });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id || "";
    const { newUserName, newUserEmail } = req.body;

    const user = await updateUserProfileService.execute({
      userId,
      newUserName,
      newUserEmail,
    });

    return res.json(user);
  }
}

export default new ProfileController();
