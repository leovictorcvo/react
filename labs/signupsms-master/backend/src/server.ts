import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import 'express-async-errors';

import router from './routes';
import errorMiddleware from './errors/middlewares';

// Configuring the container
import './providers';
import './repositories';

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);
server.use(errors());
server.use(errorMiddleware);

server.listen(3333, () =>
  // eslint-disable-next-line no-console
  console.log('Server listening at port 3333'),
);
