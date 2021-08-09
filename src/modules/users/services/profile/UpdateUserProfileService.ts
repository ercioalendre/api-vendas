import { getCustomRepository } from "typeorm";
import UsersRepository from "@UsersRepositories/UsersRepository";
import User from "@UsersEntities/User";
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

    user.name = newName;
    user.email = newEmail;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserProfileService;
