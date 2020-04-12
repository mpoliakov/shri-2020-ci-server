const express = require('express');
const ApiRoutes = require('../../const').ApiRoutes;
const buildController = require('../../controllers/build-controller');

const router = express.Router();
/*
GET  /api/builds                - список билдов
POST /api/builds/:commitHash    - добавление билда в очередь
GET  /api/builds/:buildId       - информация о конкретном билде
GET  /api/builds/:buildId/logs  - лог билда
 */
router.get(ApiRoutes.BUILD_LIST, buildController.getList);
router.get(ApiRoutes.BUILD_DETAILS, buildController.getDetails);
router.get(ApiRoutes.BUILD_LOG, buildController.getLog);
router.post(ApiRoutes.BUILD_REQUEST, buildController.request);

module.exports = router;
