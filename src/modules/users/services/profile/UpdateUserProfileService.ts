import { getCustomRepository } from "typeorm";
import UsersRepository from "@UsersRepositories/UsersRepository";
import User from "@UsersEntities/UserEntity";
import AppError from "@shared/errors/AppError";

interface IRequest {
  userId: string;
  newName: string;
  newEmail: string;
}

class UpdateUserProfileService {
  public async execute({ userId, newName, newEmail }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User was not found.", 401);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emailExists = await usersRepository.findByEmail(newEmail);

    if (emailExists) {
      if (emailExists.id === userId) {
        throw new AppError("You are already using that email address.");
      } else {
        throw new AppError(
          "The email address you're trying to use has already been taken.",
        );
      }
    }

    if (newEmail) {
      user.email = newEmail;
    }

    user.name = newName;

    await usersRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, created_at, updated_at, ...userProfileData } = user;

    return userProfileData as User;
  }
}

export const updateUserProfileService = new UpdateUserProfileService();
export default updateUserProfileService;
