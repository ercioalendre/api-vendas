import handlebars from "handlebars";

interface ITemplateVariables {
  [key: string]: number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariables;
}

export default class handlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}
