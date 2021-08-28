import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "@UsersEntities/UserEntity";
import UsersRepository from "@UsersRepositories/UsersRepository";
import upload from "@config/upload";
import diskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import s3StorageProvider from "@shared/providers/StorageProvider/S3StorageProvider";

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

    if (upload.driver === "s3") {
      if (user.avatar) await s3StorageProvider.deleteFile(user.avatar);
      user.avatar = await s3StorageProvider.saveFile(avatarFilename);
    } else if (upload.driver === "local-disk") {
      if (user.avatar) await diskStorageProvider.deleteFile(user.avatar);
      user.avatar = await diskStorageProvider.saveFile(avatarFilename);
    } else {
      throw new Error("No upload driver was specified.");
    }

    await usersRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, created_at, updated_at, ...userProfileData } = user;

    return userProfileData as User;
  }
}

export const updateUserAvatarService = new UpdateUserAvatarService();
export default updateUserAvatarService;
