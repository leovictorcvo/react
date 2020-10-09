import IHashProvider from '../interface';

class FakeHashProvider implements IHashProvider {
  hash = async (payload: string): Promise<string> => payload;

  compare = async (payload: string, hashed: string): Promise<boolean> =>
    payload === hashed;
}

export default FakeHashProvider;
