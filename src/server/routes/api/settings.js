const express = require('express');
const settingsController = require('../../controllers/settings-controller');

const router = express.Router();
/*
GET /api/settings — настройки
POST /api/settings - сохранить настройки
*/
router.route('/settings')
  .get(settingsController.get)
  .post(settingsController.save);

module.exports = router;
