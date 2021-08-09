import { Request, Response } from "express";
import updateUserAvatarService from "@UsersServices/UpdateUserAvatarService";

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const user = updateUserAvatarService.execute({
      userId: req.user.id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(user);
  }
}

export const usersAvatarController = new UserAvatarController();
export default usersAvatarController;
