import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "@UsersRepositories/UsersRepository";
import UserTokensRepository from "@UsersRepositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
  email: string;
}

class SendForgottenPassword {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User was not found.", 401);
    }

    const token = await userTokensRepository.generate(user.id);

    console.log(token);

    await EtherealMail.sendMail({
      to: email,
      body: `here's your token to change your password: ${token.token}`,
    });
  }
}

export default SendForgottenPassword;
