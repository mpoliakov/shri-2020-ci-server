import express from 'express';
import {ApiRoutes} from '../../const';
import settingsController from '../../controllers/settings-controller';

const settingsRouter = express.Router();
/*
GET /api/settings   - настройки
POST /api/settings  - сохранить настройки
*/
settingsRouter.route(ApiRoutes.SETTINGS)
  .get(settingsController.get)
  .post(settingsController.save);

export default settingsRouter;
