const axios = require('axios');
const https = require('https');
const dotenv = require('dotenv');

const BackendApiRoutes = require('../const').BackendApiRoutes;

class BackendAPI {
  constructor(authToken) {
    this._api = axios.create({
      baseURL: 'https://hw.shri.yandex/api/',
      timeout: 5000,
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

  getSettings() {
    return this._api.get(BackendApiRoutes.CONF)
      .then((res) => res.data);
  }

  saveSettings(settings) {
    /*
    {
      "repoName": "string",
      "buildCommand": "string",
      "mainBranch": "string",
      "period": 0
    }
    */
    return this._api.post(BackendApiRoutes.CONF, settings);
  }

  deleteSettings() {
    return this._api.delete(BackendApiRoutes.CONF);
  }

  getBuildList(offset = undefined, limit = 25) {
    const params = {
      offset,
      limit
    };

    return this._api.get(BackendApiRoutes.BUILD_LIST, {
      params
    }).then((res) => res.data)
  }

  getBuild(id) {
    const params = {
      buildId: id
    };

    return this._api.get(BackendApiRoutes.BUILD_DETAILS, {
      params
    }).then((res) => res.data);
  }

  requestBuild(request) {
    /*
    {
      "commitMessage": "string",
      "commitHash": "string",
      "branchName": "string",
      "authorName": "string"
    }
    */
    return this._api.post(BackendApiRoutes.BUILD_REQUEST, request);
  }

  startBuild(startInfo) {
    /*
    {
      "buildId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dateTime": "2020-03-17T05:12:37.344Z"
    }
    */
    return this._api.post(BackendApiRoutes.BUILD_START, startInfo);
  }

  finishBuild(finishInfo) {
    /*
    {
      "buildId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "duration": 0,
      "success": true,
      "buildLog": "string"
    }
    */
    return this._api.post(BackendApiRoutes.BUILD_FINISH, finishInfo);
  }

  cancelBuild(buildId) {
    /*
    {
      "buildId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
     */
    return this._api.post(BackendApiRoutes.BUILD_CANCEL, {
      buildId
    });
  }
}

dotenv.config();

module.exports = new BackendAPI(process.env.AUTH_TOKEN);

