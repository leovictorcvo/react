import CreateUserDto from 'dtos/CreateUserDto';
import UserDto from 'dtos/UserDto';

export default interface IUserRepository {
  create(data: Omit<CreateUserDto, 'confirmationToken'>): Promise<UserDto>;
  findById(id: string): Promise<UserDto | undefined>;
  findByEmail(email: string): Promise<UserDto | undefined>;
}
