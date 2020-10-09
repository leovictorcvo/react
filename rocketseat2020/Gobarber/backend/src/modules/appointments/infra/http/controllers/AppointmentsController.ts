import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import GetAppointmentService from '@modules/appointments/services/GetAppointmentService';

export default class AppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const getAppointmentService = container.resolve(GetAppointmentService);

    const appointments = await getAppointmentService.execute();
    return res.json(appointments);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;
    const user_id = req.user.id;

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      date,
      user_id,
      provider_id,
    });

    return res.json(appointment);
  }
}
