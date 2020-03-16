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
router.post('/builds/:commitHash', (req, res) => {
  // Add build to queue (Backend API: POST /build/request) --> set build.status
  // Build module --- for now should be mocked (setTimeout)
  // Start build (Backend API: POST /build/start) --> set build.status, build.start
  // Build module --- for now should be mocked (setTimeout)
  // Finish build (Backend API: POST /build/finish) -- set build.status, build.duration
  res.text(req.params.commitHash);
});

module.exports = router;
