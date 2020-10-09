import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const dateOfAppointment = startOfHour(date);
    const existsAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      dateOfAppointment,
    );

    if (existsAppointmentInSameDate) {
      throw new AppError('An appointment already booked in the selected date');
    }

    if (isBefore(dateOfAppointment, Date.now())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself");
    }

    if (getHours(dateOfAppointment) < 8 || getHours(dateOfAppointment) > 17) {
      throw new AppError(
        'You can only create an appointement between 8am and 5pm',
      );
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: dateOfAppointment,
    });

    const dateFormatted = format(dateOfAppointment, "dd/MM/yyyy 'às' HH:mm");
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormatted}`,
    });

    const cacheKey = `provider-appointments:${provider_id}:${format(
      dateOfAppointment,
      'yyyy:M:d',
    )}`;

    await this.cacheProvider.invalidate(cacheKey);
    return appointment;
  }
}

export default CreateAppointmentService;
