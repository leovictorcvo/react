import { uuid } from 'uuidv4';

import CreateUserDto from 'dtos/CreateUserDto';
import UserDto from 'dtos/UserDto';
import IUserRepository from '../interface';

class FakeUserRepository implements IUserRepository {
  private users: UserDto[] = [];

  create = async (
    data: Omit<CreateUserDto, 'confirmationToken'>,
  ): Promise<UserDto> => {
    const user: UserDto = {
      id: uuid(),
      ...data,
    };
    this.users.push(user);
    return Promise.resolve(user);
  };

  findById = (id: string): Promise<UserDto | undefined> =>
    Promise.resolve(this.users.find(u => u.id === id));

  findByEmail = (email: string): Promise<UserDto | undefined> =>
    Promise.resolve(this.users.find(u => u.email === email));
}

export default FakeUserRepository;
