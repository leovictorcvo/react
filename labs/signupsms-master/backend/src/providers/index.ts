import { container } from 'tsyringe';

import SmsProvider from './SmsProvider/implementation';
import ISmsProvider from './SmsProvider/interface';

import HashProvider from './HashProvider/implementation';
import IHashProvider from './HashProvider/interface';

container.registerSingleton<ISmsProvider>('SmsProvider', SmsProvider);
container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
