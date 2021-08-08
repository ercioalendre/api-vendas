import handlebars from "handlebars";
import fs from "fs";

interface ITemplateVariables {
  [key: string]: number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

export default class handlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, "utf8");
    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}
