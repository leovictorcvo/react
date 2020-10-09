import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.body;

    const service = container.resolve(ListProvidersAppointmentsService);
    const appointments = await service.execute({
      provider_id,
      day,
      month,
      year,
    });
    return res.json(appointments);
  }
}
