const axios = require('axios');
const https = require('https');
const dotenv = require('dotenv');

const BackendApiRoutes = require('../const').BackendApiRoutes;

class BackendAPI {
  constructor(api) {
    this._api = api;
  }

  async getSettings() {
    const res = await this._api.get(BackendApiRoutes.CONF);
    return res.data;
  }

  async saveSettings(settings) {
    /*{
      "repoName": "string",
      "buildCommand": "string",
      "mainBranch": "string",
      "period": 0
    }*/
    await this._api.post(BackendApiRoutes.CONF, settings);
  }

  async deleteSettings() {
    const res = await this._api.delete(BackendApiRoutes.CONF);
    return res.data;
  }

  async getBuildList(offset = undefined, limit = 25) {
    const params = {
      offset,
      limit
    };

    const res = await this._api.get(BackendApiRoutes.BUILD_LIST, {params});
    return res.data;
  }

  async getBuild(id) {
    const params = {
      buildId: id
    };

    const res = await this._api.get(BackendApiRoutes.BUILD_DETAILS, {params});
    return res.data;
  }

  async getBuildLog(id) {
    const params = {
      buildId: id
    };

    const res = await this._api.get(BackendApiRoutes.BUILD_LOG, {params});
    return res.data;
  }

  async requestBuild(request) {
    /*{
      "commitMessage": "string",
      "commitHash": "string",
      "branchName": "string",
      "authorName": "string"
    }*/
    const res = await this._api.post(BackendApiRoutes.BUILD_REQUEST, request);
    return res.data;
  }

  async startBuild(startInfo) {
    /*{
      "buildId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dateTime": "2020-03-17T05:12:37.344Z"
    }*/
    await this._api.post(BackendApiRoutes.BUILD_START, startInfo);
  }

  async finishBuild(finishInfo) {
    /*{
      "buildId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "duration": 0,
      "success": true,
      "buildLog": "string"
    }*/
    await this._api.post(BackendApiRoutes.BUILD_FINISH, finishInfo);
  }

  async cancelBuild(buildId) {
    /*{
      "buildId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }*/
    await this._api.post(BackendApiRoutes.BUILD_CANCEL, {buildId});
  }
}

dotenv.config();

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  timeout: 10000,
  headers: {
    Authorization: 'Bearer ' + process.env.AUTH_TOKEN
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

/*
const onSuccess = (response) => {};
const onFail = (error) => {};
api.interceptors.response.use(onSuccess, onFail);
*/

const instance = new BackendAPI(api);

module.exports = {
  BackendAPI,
  instance
};

