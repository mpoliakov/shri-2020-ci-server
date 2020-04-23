import express from 'express';
import {ApiRoutes} from '../../const';
import buildController from '../../controllers/build-controller';

const buildsRouter = express.Router();
/*
GET  /api/builds                - список билдов
POST /api/builds/:commitHash    - добавление билда в очередь
GET  /api/builds/:buildId       - информация о конкретном билде
GET  /api/builds/:buildId/logs  - лог билда
 */
buildsRouter.get(ApiRoutes.BUILD_LIST, buildController.getList);
buildsRouter.get(ApiRoutes.BUILD_DETAILS, buildController.getDetails);
buildsRouter.get(ApiRoutes.BUILD_LOG, buildController.getLog);
buildsRouter.post(ApiRoutes.BUILD_REQUEST, buildController.request);

export default buildsRouter;
