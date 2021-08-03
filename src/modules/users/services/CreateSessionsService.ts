import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "@UsersEntities";
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

    const token = sign({}, "3ef42d1353b256c8c1bd8120028c185c", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
