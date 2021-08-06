import jwt from "@config/auth/jwt";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "@UsersEntities/User";
import UsersRepository from "@UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);
    const userPassword = user?.password || "";
    const passwordComparison = await compare(password, userPassword);

    if (!user || !passwordComparison) {
      throw new AppError(
        "The username or password you entered is incorrect.",
        401,
      );
    }

    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
