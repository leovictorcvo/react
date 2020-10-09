import PhoneToken from 'dtos/PhoneTokenDto';

export default interface IConfirmationTokenRepository {
  create(data: PhoneToken): void;
  findByPhone(phone: string): PhoneToken;
}
