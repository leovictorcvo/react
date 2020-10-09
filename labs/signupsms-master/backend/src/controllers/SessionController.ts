import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const service = container.resolve(AuthenticateUserService);

    const result = await service.execute(email, password);

    return res.send(result);
  }
}

export default SessionController;
