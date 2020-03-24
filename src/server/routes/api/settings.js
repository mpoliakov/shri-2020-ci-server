const settingsController = require('../../controllers/settings-controller');
const router = require('express').Router();

/*
GET /api/settings — получение сохраненных настроек
POST /api/settings - cохранение настроек
 */
router.route('/settings')
  .get(settingsController.get)
  .post(settingsController.save);

module.exports = router;
