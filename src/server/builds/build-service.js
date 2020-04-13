const Utils = require('../utils');

const stubLog = require('../../stub/log');

const buildService = {
  async getLog(buildId) {
    await Utils.delay(500);
    return stubLog;
  }
}

module.exports = buildService;

