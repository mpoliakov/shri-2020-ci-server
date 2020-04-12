const Utils = require('../utils');

const mockedLog = require('./mock/log');

const buildService = {
  async getLog(buildId) {
    await Utils.delay(500);
    return mockedLog;
  }
}

module.exports = buildService;

