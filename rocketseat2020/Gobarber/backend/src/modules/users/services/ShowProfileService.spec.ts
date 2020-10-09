import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

const name = 'teste';
const email = 'teste@teste.com';
const password = '12345678';

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show a registerd user', async () => {
    const user = await fakeUserRepository.create({
      name,
      email,
      password,
    });

    const foundUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(foundUser.id).toBe(user.id);
    expect(foundUser.name).toBe(user.name);
    expect(foundUser.email).toBe(user.email);
  });

  it('should not be able to show a unregisterd user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
