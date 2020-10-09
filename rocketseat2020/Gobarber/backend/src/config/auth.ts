export default {
  jwt: {
    secret: process.env.TOKEN_SECRET || '98EE032D6D7988GECF9E67B222683DEF7',
    expiresIn: process.env.TOKEN_EXPIRATION || '1d',
  },
};
