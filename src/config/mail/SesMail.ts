import nodemailer from "nodemailer";
import handlebarsMailTemplate from "@config/mail/HandlebarsMailTemplate";
import aws from "aws-sdk";
import mail from "@config/mail/mail";

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

export default class SesMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new handlebarsMailTemplate();
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
      }),
    });

    const { email, name } = mail.defaults.from;

    transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to?.name || "API Vendas Team",
        address: to?.email || "no-reply@apivendas.com.br",
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
