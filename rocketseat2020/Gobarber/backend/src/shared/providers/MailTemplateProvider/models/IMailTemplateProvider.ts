import IParseMailTemplateDTO from '../dtos/IParseMailTemplatedTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
