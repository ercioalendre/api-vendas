import { getCustomRepository } from "typeorm";
import UsersRepository from "@UsersRepositories/UsersRepository";
import User from "@UsersEntities/UserEntity";
import AppError from "@shared/errors/AppError";

interface IRequest {
  userId: string;
}

class ShowUserProfileService {
  public async execute({ userId }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User was not found.", 401);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, created_at, updated_at, ...userProfileData } = user;

    return userProfileData as User;
  }
}

export default new ShowUserProfileService();
