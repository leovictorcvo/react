import { container } from 'tsyringe';
import { createConnections } from 'typeorm';

import IConfirmationTokenRepository from './ConfirmationTokenRepository/interface';
import ConfirmationTokenRepository from './ConfirmationTokenRepository/implementation';

import IUserRepository from './UserRepository/interface';
import UserRepository from './UserRepository/implementation';

createConnections();
container.registerSingleton<IConfirmationTokenRepository>(
  'ConfirmationTokenRepository',
  ConfirmationTokenRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
