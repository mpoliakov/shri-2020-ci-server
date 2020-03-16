const buildController = require('../../controllers/build-controller');
const router = require('express').Router();

/*
GET  /api/builds - получение списка сборок
POST /api/builds/:commitHash - добавление сборки в очередь
GET  /api/builds/:buildId - получение информации о конкретной сборке
GET  /api/builds/:buildId/logs - получение логов билда (сплошной текст)
 */
router.get('/builds', buildController.getList);
router.get('/builds/:buildId', buildController.getBuildDetails);
router.get('/builds/:buildId/logs', buildController.getBuildLog);
router.post('/builds/:commitHash', buildController.addBuild);

module.exports = router;
