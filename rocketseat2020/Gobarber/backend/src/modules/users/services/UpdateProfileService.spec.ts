import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

const name = 'teste';
const email = 'teste@teste.com';
const password = '12345678';

const newName = 'teste2';
const newEmail = 'teste2@teste.com';
const newPassword = '87654321';

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update name and email', async () => {
    const user = await fakeUserRepository.create({
      name,
      email,
      password,
    });

    const udpatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: newName,
      email: newEmail,
    });

    expect(udpatedUser.id).toBe(user.id);
    expect(udpatedUser.name).toBe(newName);
    expect(udpatedUser.email).toBe(newEmail);
  });

  it('should not be able to update email to existing email', async () => {
    await fakeUserRepository.create({
      name: newName,
      email: newEmail,
      password: newPassword,
    });

    const user = await fakeUserRepository.create({
      name,
      email,
      password,
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: newName,
        email: newEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile of unregistered user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        name: newName,
        email: newEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should should not be able to change the password without inform the old password', async () => {
    const user = await fakeUserRepository.create({
      name,
      email,
      password,
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: newName,
        email: newEmail,
        password: newPassword,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should should not be able to change the password with invalid old password', async () => {
    const user = await fakeUserRepository.create({
      name,
      email,
      password,
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: newName,
        email: newEmail,
        old_password: newPassword,
        password: newPassword,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUserRepository.create({
      name,
      email,
      password,
    });

    const udpatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: newName,
      email: newEmail,
      old_password: password,
      password: newPassword,
    });

    expect(udpatedUser.id).toBe(user.id);
    expect(udpatedUser.name).toBe(newName);
    expect(udpatedUser.email).toBe(newEmail);
    expect(udpatedUser.password).toBe(newPassword);
  });
});
