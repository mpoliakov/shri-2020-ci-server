const axios = require('axios');
const https = require('https');
const mockedLog = require('./mock/log');

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

class BackendAPI {
  constructor(authToken) {
    this._api = axios.create({
      baseURL: 'https://hw.shri.yandex/api/',
      timeout: 1000,
      headers: {
        Authorization: 'Bearer ' + authToken
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    /*
    const onSuccess = (response) => {
      return response;
    };

    const onFail = (error) => {
      throw error;
    }

    this._api.interceptors.response.use(onSuccess, onFail);
    */
  }

  getConf() {
    return this._api.get('/conf').then((res) => res.data.data);
  }

  saveConf(settings) {
    return this._api.post('/conf', settings);
  }

  deleteConf() {
    return this._api.delete('/conf');
  }

  getBuilds(offset = undefined, limit = 25) {
    return this._api.get('/build/list', {
      params: {
        offset,
        limit
      }
    }).then((res) => res.data.data)
  }

  getBuildDetails(id) {
    return this._api.get('/build/details', {
      params: {
        buildId: id
      }
    }).then((res) => res.data.data);
  }

  getBuildLog(id) {
    return delay(1000).then(() => mockedLog.text);
  }

  requestBuild(request) {
    return this._api.post('/build/request', request);
  }

  startBuild() {
    // will be executed by Build Module
  }

  finishBuild() {
    // will be executed by Build Module
  }

  cancelBuild() {
    // will be executed by Build Module
  }
}

module.exports = BackendAPI;

