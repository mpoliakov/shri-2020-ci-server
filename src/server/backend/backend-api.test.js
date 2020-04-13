const axios = require('axios');
const BackendAPI = require('./backend-api').BackendAPI;
const BackendApiRoutes = require('../const').BackendApiRoutes;

const stubSettings = require('../../stub/settings');
const stubBuilds = require('../../stub/builds');
const stubBuild = require('../../stub/build');

jest.mock('axios');

describe(`Backend API works correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`Backend API returns settings`, () => {
    axios.get.mockImplementation(() => Promise.resolve({
      data: stubSettings
    }));

    const backendAPI = new BackendAPI(axios);

    backendAPI.getSettings().then((res) => expect(res).toEqual(stubSettings));
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(BackendApiRoutes.CONF);
  });

  it(`Backend API saves settings`, () => {
    axios.post.mockImplementation(() => Promise.resolve());

    const backendAPI = new BackendAPI(axios);

    backendAPI.saveSettings(stubSettings);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(BackendApiRoutes.CONF, stubSettings);
  });

  it(`Backend API returns builds`, () => {
    axios.get.mockImplementation(() => Promise.resolve({
      data: stubBuilds
    }));

    const backendAPI = new BackendAPI(axios);

    backendAPI.getBuildList().then((res) => expect(res).toEqual(stubBuilds));
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(BackendApiRoutes.BUILD_LIST, {
      params: {
        offset: undefined,
        limit: 25
      }
    });
  });

  it(`Backend API returns build`, () => {
    axios.get.mockImplementation(() => Promise.resolve({
      data: stubBuild
    }));

    const backendAPI = new BackendAPI(axios);

    backendAPI.getBuild(`3fa85f64-5717-4562-b3fc-2c963f66afa6`).then((res) => expect(res).toEqual(stubBuild));
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(BackendApiRoutes.BUILD_DETAILS, {
      params: {
        buildId: `3fa85f64-5717-4562-b3fc-2c963f66afa6`
      }
    });
  });
});
