import { injectable, inject } from 'tsyringe';

import CreateUserDto from '../dtos/CreateUserDto';
import UserDto from '../dtos/UserDto';
import IHashProvider from '../providers/HashProvider/interface';
import IConfirmationTokenRepository from '../repositories/ConfirmationTokenRepository/interface';
import IUserRepository from '../repositories/UserRepository/interface';
import AppError from '../errors/AppError';

@injectable()
class CreateUser {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ConfirmationTokenRepository')
    private confirmationTokenRepository: IConfirmationTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: CreateUserDto): Promise<UserDto> {
    const { name, password, email, phone, confirmationToken } = data;

    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email já cadastrado');
    }

    const phoneToken = this.confirmationTokenRepository.findByPhone(phone);
    if (!phoneToken || phoneToken.token !== confirmationToken) {
      throw new AppError('Código de confirmação inválido');
    }

    const hashedPassword = await this.hashProvider.hash(password);

    return this.userRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
  }
}

export default CreateUser;
