import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUser from '../services/CreateUser';

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(CreateUser);

    const result = await service.execute(req.body);

    delete result.password;

    return res.send(result);
  }
}

export default UserController;
