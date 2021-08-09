import { getCustomRepository } from "typeorm";
import UsersRepository from "@UsersRepositories/UsersRepository";
import User from "@UsersEntities/User";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation?: string;
}

class ChangePasswordService {
  public async execute({
    userId,
    currentPassword,
    newPassword,
    newPasswordConfirmation,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User was not found.", 401);
    }

    if (newPassword !== newPasswordConfirmation) {
      throw new AppError(
        "New password and new password confirmation doesn't match.",
      );
    }

    if (newPassword && !currentPassword) {
      throw new AppError(
        "You must insert your current password in order to change it",
      );
    }

    if (newPassword && currentPassword) {
      const checkCurrentPassword = await compare(
        currentPassword,
        user.password,
      );

      if (!checkCurrentPassword) {
        throw new AppError("Your current password is wrong.");
      }

      user.password = await hash(newPassword, 8);
    }

    await usersRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, created_at, updated_at, ...userProfileData } = user;

    return userProfileData as User;
  }
}

export const changePasswordService = new ChangePasswordService();
export default changePasswordService;
