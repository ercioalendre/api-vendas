import nodemailer from "nodemailer";
import handlebarsMailTemplate from "@config/mail/HandlebarsMailTemplate";

interface ITemplateVariables {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new handlebarsMailTemplate();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = transporter.sendMail({
      from: {
        name: from?.name || "Equipe API Vendas",
        address: from?.email || "no-reply@apivendas.com.br",
      },
      to: {
        name: to?.name || "API Vendas Team",
        address: to?.email || "no-reply@apivendas.com.br",
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log("Message sent: %s", (await message).messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(await message));
  }
}
