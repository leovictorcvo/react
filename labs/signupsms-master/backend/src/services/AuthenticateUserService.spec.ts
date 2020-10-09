import AppError from '../errors/AppError';
import FakeUserRepository from '../repositories/UserRepository/fake';
import FakeHashProvider from '../providers/HashProvider/fake';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

const name = 'Fake name';
const email = 'fake@email.com';
const password = 'fake_passwd';
const phone = '1234567890';

describe('AuthenticateUserService', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    await fakeUserRepository.create({
      name,
      email,
      password,
      phone,
    });
  });

  it('should authenticate with correct credentials', async () => {
    const result = await authenticateUserService.execute(email, password);
    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('token');
    expect(result.user.name).toBe(name);
    expect(result.user.email).toBe(email);
  });

  it('should not authenticate with incorrect email', async () => {
    await expect(
      authenticateUserService.execute('email', password),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate with incorrect password', async () => {
    await expect(
      authenticateUserService.execute(email, 'incorrect_password'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
