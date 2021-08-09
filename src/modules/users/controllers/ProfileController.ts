import { Request, Response } from "express";
import ShowUserProfileService from "@UsersServices/profile/ShowUserProfileService";
import UpdateUserProfileService from "@UsersServices/profile/UpdateUserProfileService";

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id || "";
    const showProfile = new ShowUserProfileService();

    const user = await showProfile.execute({ userId });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id || "";
    const { newName, newEmail } = req.body;

    const updateProfile = new UpdateUserProfileService();

    const user = await updateProfile.execute({
      userId,
      newName,
      newEmail,
    });

    return res.json(user);
  }
}
