import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  find(): Promise<Appointment[] | undefined>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonth(data: IFindAllInMonthProviderDTO): Promise<Appointment[]>;
  findAllInDay(data: IFindAllInDayProviderDTO): Promise<Appointment[]>;
}
