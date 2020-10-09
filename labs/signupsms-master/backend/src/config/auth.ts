import 'dotenv/config';

export default {
  secret: process.env.AUTH_SECRET as string,
  expiration: process.env.AUTH_EXPIRATION as string,
};
