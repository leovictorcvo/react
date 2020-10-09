import AppError from '../errors/AppError';
import CreateUserDto from '../dtos/CreateUserDto';
import FakeConfirmationTokenRepository from '../repositories/ConfirmationTokenRepository/fake';
import FakeUserRepository from '../repositories/UserRepository/fake';
import FakeHashProvider from '../providers/HashProvider/fake';
import CreateUserService from './CreateUser';

let fakeConfirmationRepository: FakeConfirmationTokenRepository;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let service: CreateUserService;
let data: CreateUserDto;

describe('CreateUser Service', () => {
  beforeEach(() => {
    fakeConfirmationRepository = new FakeConfirmationTokenRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    service = new CreateUserService(
      fakeUserRepository,
      fakeConfirmationRepository,
      fakeHashProvider,
    );
    fakeConfirmationRepository.create({
      phone: '1234567890',
      token: '123',
      expiresIn: new Date(Date.now() + 10 * 60000),
    });
    data = {
      name: 'teste',
      email: 'teste@teste.com',
      phone: '1234567890',
      password: '123',
      confirmationToken: '123',
    };
  });

  it('should create the user if confirmation is correct', async () => {
    const user = await service.execute(data);
    expect(user.phone).toBe(data.phone);
  });

  it('should not acept duplicate email', async () => {
    await service.execute(data);
    await expect(service.execute(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should not acept incorrect confirmation token', async () => {
    data.confirmationToken = 'incorrect token';
    await expect(service.execute(data)).rejects.toBeInstanceOf(AppError);
  });
});
