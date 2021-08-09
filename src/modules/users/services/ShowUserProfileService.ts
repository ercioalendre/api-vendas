import { getCustomRepository } from "typeorm";
import UsersRepository from "@UsersRepositories/UsersRepository";
import User from "@UsersEntities/User";
import AppError from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
}

class ShowUserProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User was not found.", 401);
    }

    return user;
  }
}

export default ShowUserProfileService;
