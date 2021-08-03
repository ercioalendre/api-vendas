import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "@UsersEntities";
import UsersRepository from "@UsersRepositories";
import { compare } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<User | undefined> {
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

    return user;
  }
}

export default CreateSessionsService;
