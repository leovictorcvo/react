import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

const name = 'teste';
const email = 'teste@teste.com';
const password = '12345678';
const avatar = 'avatar.jpg';

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to upload a user avatar', async () => {
    let user = await fakeUserRepository.create({
      name,
      email,
      password,
    });

    expect(user.avatar).toBe(undefined);

    user = await updateUserAvatarService.execute({
      user_id: user.id,
      avatar,
    });

    expect(user.avatar).toBe(avatar);
  });

  it('should not be able to upload avatar from unregistered user', async () => {
    const user_id = '12345678';

    await expect(
      updateUserAvatarService.execute({
        user_id,
        avatar,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar from the user', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const newAvatar = 'new_avatar.jpg';

    let user = await fakeUserRepository.create({
      name,
      email,
      password,
    });

    expect(user.avatar).toBe(undefined);

    user = await updateUserAvatarService.execute({
      user_id: user.id,
      avatar,
    });

    expect(user.avatar).toBe(avatar);
    expect(deleteFile).not.toHaveBeenCalled();

    user = await updateUserAvatarService.execute({
      user_id: user.id,
      avatar: newAvatar,
    });

    expect(user.avatar).toBe(newAvatar);
    expect(deleteFile).toHaveBeenCalledWith(avatar);
  });
});
