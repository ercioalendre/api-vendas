import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "@UsersRepositories/UsersRepository";
import UserTokensRepository from "@UsersRepositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";

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

    const { token } = await userTokensRepository.generate(user.id);

    console.log(token);

    const forgottenPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "..",
      "views",
      "forgotten-password.hbs",
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "Password Recovery",
      templateData: {
        file: forgottenPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/password/reset/${token}`,
        },
      },
    });
  }
}

export const sendForgottenPasswordService = new SendForgottenPassword();
export default sendForgottenPasswordService;
