const mockedLog = require('./mock/log');

const buildService = {
  getLog(buildId) {
    return mockedLog;
  }
}

module.exports = buildService;

