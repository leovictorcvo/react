import ISmsProviderDTO from '../dto/ISmsProviderDTO';
import ISmsProvider from '../interface';

class FakeSmsProvider implements ISmsProvider {
  sendSms(data: ISmsProviderDTO): void {
    const { phone, message } = data;
    // eslint-disable-next-line no-console
    console.log(`Sending SMS to ${phone}: ${message}`);
  }
}

export default FakeSmsProvider;
