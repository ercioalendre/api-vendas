import jwt from "@config/auth/jwt";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "@UsersRepositories/UsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: Record<string, unknown>;
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pw, created_at, updated_at, ...userProfileData } = user;

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    };
  }
}

export default new CreateSessionsService();
