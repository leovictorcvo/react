import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'teste1',
      email: 'teste1@teste.com',
      password: '12345678',
    });

    const user2 = await fakeUserRepository.create({
      name: 'teste2',
      email: 'teste2@teste.com',
      password: '12345678',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'teste3',
      email: 'teste3@teste.com',
      password: '12345678',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toHaveLength(2);
    expect(providers).toEqual([user1, user2]);
  });
});
