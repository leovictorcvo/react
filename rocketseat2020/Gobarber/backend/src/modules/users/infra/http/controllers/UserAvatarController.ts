import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateAvatarUserService from '@modules/users/services//UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { filename } = req.file;

    const service = container.resolve(UpdateAvatarUserService);
    const user = await service.execute({ user_id: id, avatar: filename });

    return res.json(classToClass(user));
  }
}
