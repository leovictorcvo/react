import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      phone: Joi.string()
        .required()
        .regex(/^[0-9]{10,12}$/),
      password: Joi.string().required().min(6),
      confirmationToken: Joi.string().required(),
    },
  }),
  userController.create,
);

export default router;
