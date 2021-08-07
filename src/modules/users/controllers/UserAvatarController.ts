import { Request, Response } from "express";
import UpdateUserAvatarService from "@UsersServices/UpdateUserAvatarService";

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      userId: req.user.id as string,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(user);
  }
}
