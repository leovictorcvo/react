import ISmsProviderDTO from '../dto/ISmsProviderDTO';

export default interface ISmsProvider {
  sendSms(data: ISmsProviderDTO): void;
}
