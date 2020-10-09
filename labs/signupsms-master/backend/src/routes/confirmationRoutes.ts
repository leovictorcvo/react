import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ConfirmationController from '../controllers/ConfirmationController';

const router = Router();
const confirmationController = new ConfirmationController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      phone: Joi.string()
        .required()
        .regex(/^[0-9]{10,12}$/),
    },
  }),
  confirmationController.create,
);

export default router;
