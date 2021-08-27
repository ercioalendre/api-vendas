import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import UsersRepository from "@UsersRepositories/UsersRepository";
import UserTokensRepository from "@UsersRepositories/UserTokensRepository";

interface IRequest {
  token: string;
  newPassword: string;
}

class ResetPasswordService {
  public async execute({ token, newPassword }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const userToken = await userTokensRepository.findByToken(token);

    if (!token || !userToken) {
      throw new AppError("User Token was not found.", 401);
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User was not found.", 401);
    }

    const tokenCreatedAt = userToken.createdAt;
    const isTokenExpired = isAfter(Date.now(), addHours(tokenCreatedAt, 2));

    if (isTokenExpired) {
      throw new AppError("Token expired.", 401);
    }

    user.password = await hash(newPassword, 8);

    await usersRepository.save(user);
  }
}

export const resetPasswordService = new ResetPasswordService();
export default resetPasswordService;
