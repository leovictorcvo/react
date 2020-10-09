import FakeSmsProvider from '../providers/SmsProvider/fake';
import SendValidationCode from './SendValidationCode';
import FakeConfirmationTokenRepository from '../repositories/ConfirmationTokenRepository/fake';

let fakeSmsProvider: FakeSmsProvider;
let fakeRepository: FakeConfirmationTokenRepository;
let sendValidationCode: SendValidationCode;

describe('Send Validation Code To User', () => {
  beforeEach(() => {
    fakeSmsProvider = new FakeSmsProvider();
    fakeRepository = new FakeConfirmationTokenRepository();
    sendValidationCode = new SendValidationCode(
      fakeSmsProvider,
      fakeRepository,
    );
  });

  it('should send a validation code to user and return token', async () => {
    const sendSms = jest.spyOn(fakeSmsProvider, 'sendSms');

    await sendValidationCode.execute('123');

    expect(sendSms).toBeCalled();
  });

  it('should store a validation code', async () => {
    const create = jest.spyOn(fakeRepository, 'create');

    await sendValidationCode.execute('123');

    expect(create).toBeCalled();
  });
});
