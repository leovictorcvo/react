import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProvidersAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const key = `provider-appointments:${provider_id}:${year}:${month}:${day}`;
    let appointments = await this.cacheProvider.recover<Appointment[]>(key);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDay({
        provider_id,
        day,
        month,
        year,
      });

      await this.cacheProvider.save(key, JSON.stringify(appointments));
    }

    return appointments;
  }
}
