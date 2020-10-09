import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendValidationCode from '../services/SendValidationCode';

class ConfirmationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { phone } = req.body;

    const service = container.resolve(SendValidationCode);

    const result = await service.execute(phone);

    return res.send(result);
  }
}

export default ConfirmationController;
