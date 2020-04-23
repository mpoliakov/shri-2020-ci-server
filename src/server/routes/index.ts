import {Router} from 'express';
import settingsRouter from './api/settings';
import buildsRouter from './api/builds';

const router = Router();

router.use('/api', settingsRouter);
router.use('/api', buildsRouter);

export default router;
