var router = require('express').Router();

router.use('/api', require('./api/settings'));
router.use('/api', require('./api/builds'));

module.exports = router;
