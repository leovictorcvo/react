import { hash, compare } from 'bcryptjs';

import IHashProvider from '../interface';

class HashProvider implements IHashProvider {
  hash = async (payload: string): Promise<string> => hash(payload, 8);

  compare = async (payload: string, hashed: string): Promise<boolean> =>
    compare(payload, hashed);
}

export default HashProvider;
