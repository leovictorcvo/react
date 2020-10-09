import { injectable, inject } from 'tsyringe';

import PhoneTokenDto from '../dtos/PhoneTokenDto';
import ISmsProvider from '../providers/SmsProvider/interface';
import IConfirmationTokenRepository from '../repositories/ConfirmationTokenRepository/interface';
import tokenGenerator from '../utils/TokenGenerator';
import phoneTokenConfig from '../config/phoneToken';

@injectable()
class SendValidationCode {
  constructor(
    @inject('SmsProvider')
    private smsProvider: ISmsProvider,

    @inject('ConfirmationTokenRepository')
    private confirmationTokenRepository: IConfirmationTokenRepository,
  ) {}

  public async execute(
    phone: string,
  ): Promise<Pick<PhoneTokenDto, 'phone' | 'token'>> {
    const token = tokenGenerator.generate();
    const expiresIn = new Date(
      Date.now() + phoneTokenConfig.tokenExpirationInMinutes * 60000,
    );
    this.confirmationTokenRepository.create({ phone, token, expiresIn });
    this.smsProvider.sendSms({
      phone,
      message: `Seu código de verificação é: ${token}`,
    });
    return { phone, token };
  }
}

export default SendValidationCode;
