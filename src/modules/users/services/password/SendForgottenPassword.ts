import path from "path";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "@UsersRepositories/UsersRepository";
import UserTokensRepository from "@UsersRepositories/UserTokensRepository";
import SesMail from "@config/mail/SesMail";
import EtherealMail from "@config/mail/EtherealMail";
import mail from "@config/mail/mail";

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

    const forgottenPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "..",
      "views",
      "forgotten-password.hbs",
    );

    if (mail.driver === "ses") {
      try {
        await SesMail.sendMail({
          to: {
            name: user.name,
            email: user.email,
          },
          subject: "[API Vendas] Password Recovery",
          templateData: {
            file: forgottenPasswordTemplate,
            variables: {
              name: user.name,
              link: `${process.env.APP_API_URL}/password/reset/${token}`,
            },
          },
        });
      } catch (error) {
        throw new AppError(
          "Error: it wasn't possible to send your recover password message.",
        );
      }
    } else {
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
            link: `${process.env.APP_API_URL}/password/reset/${token}`,
          },
        },
      });
    }
  }
}

export default new SendForgottenPassword();
