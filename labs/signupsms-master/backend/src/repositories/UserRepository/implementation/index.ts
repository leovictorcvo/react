import { getRepository, Repository } from 'typeorm';

import CreateUserDto from 'dtos/CreateUserDto';
import UserDto from 'dtos/UserDto';
import UserEntity from '../../../entities/user';
import IUserRepository from '../interface';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<UserEntity>;

  constructor() {
    this.ormRepository = getRepository(UserEntity);
  }

  create = async (
    data: Omit<CreateUserDto, 'confirmationToken'>,
  ): Promise<UserDto> => {
    const user = this.ormRepository.create(data);
    return this.ormRepository.save(user);
  };

  findById = async (id: string): Promise<UserDto | undefined> =>
    this.ormRepository.findOne(id);

  findByEmail = async (email: string): Promise<UserDto | undefined> =>
    this.ormRepository.findOne({ where: { email } });
}

export default UserRepository;
