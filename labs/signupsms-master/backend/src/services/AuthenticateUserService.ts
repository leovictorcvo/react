import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AuthConfig from '../config/auth';
import AuthenticatedUserDto from '../dtos/AuthenticatedUserDto';
import AppError from '../errors/AppError';
import IHashProvider from '../providers/HashProvider/interface';
import IUserRepository from '../repositories/UserRepository/interface';

@injectable()
class AuthenticateUser {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(
    email: string,
    password: string,
  ): Promise<AuthenticatedUserDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('O e-mail ou a senha está incorreta', 401);
    }

    if (!(await this.hashProvider.compare(password, user.password))) {
      throw new AppError('O e-mail ou a senha está incorreta', 401);
    }

    const { id, name, phone } = user;

    const token = sign({}, AuthConfig.expiration, {
      subject: id,
      expiresIn: AuthConfig.expiration,
    });

    return {
      user: {
        id,
        name,
        email,
        phone,
      },
      token,
    };
  }
}

export default AuthenticateUser;
