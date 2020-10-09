import crypto from 'crypto';

export default {
  generate(): string {
    return crypto.randomBytes(4).toString('hex');
  },
};
