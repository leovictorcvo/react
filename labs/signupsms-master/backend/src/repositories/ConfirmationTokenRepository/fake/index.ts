import PhoneToken from 'dtos/PhoneTokenDto';
import IConfirmationTokenRepository from '../interface';

interface phoneTokenMap {
  [key: string]: PhoneToken;
}
class FakeConfirmationTokenRepository implements IConfirmationTokenRepository {
  private tokens: phoneTokenMap = {};

  create(data: PhoneToken): void {
    this.tokens[data.phone] = data;
  }

  findByPhone = (phone: string): PhoneToken => this.tokens[phone];
}

export default FakeConfirmationTokenRepository;
