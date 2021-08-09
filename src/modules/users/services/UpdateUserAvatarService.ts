import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "@UsersEntities/User";
import UsersRepository from "@UsersRepositories/UsersRepository";
import uploadConfig from "@config/upload";
import path from "path";
import fs from "fs";

interface IRequest {
  userId: string | undefined;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user =
      userId !== undefined ? await usersRepository.findById(userId) : undefined;

    if (!user) {
      throw new AppError("User was not found.", 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = fs.existsSync(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, created_at, updated_at, ...userProfileData } = user;

    return userProfileData as User;
  }
}

export const updateUserAvatarService = new UpdateUserAvatarService();
export default updateUserAvatarService;
