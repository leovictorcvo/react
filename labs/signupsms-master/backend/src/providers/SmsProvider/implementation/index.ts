import axios from 'axios';
import ISmsProvider from '../interface';
import ISmsProviderDTO from '../dto/ISmsProviderDTO';

class SmsProvider implements ISmsProvider {
  sendSms(smsData: ISmsProviderDTO): void {
    const { phone, message } = smsData;
    const url = 'https://api2.totalvoice.com.br/sms';
    const data = {
      numero_destino: phone,
      mensagem: message,
    };
    axios.post(url, data, {
      headers: {
        Accept: 'application/json',
        'Access-Token': process.env.ZENVIA_TOKEN,
      },
    });
  }
}

export default SmsProvider;
