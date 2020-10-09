import { Router } from 'express';

import confirmationRoutes from './confirmationRoutes';
import sessionRoutes from './sessionRoutes';
import userRoutes from './usersRoutes';

const router = Router();

router.get('/teste', (req, res) => res.send('ok'));
router.use('/confirmation', confirmationRoutes);
router.use('/session', sessionRoutes);
router.use('/users', userRoutes);

export default router;
