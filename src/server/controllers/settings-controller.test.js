const settingsController = require('./settings-controller');
const backendAPI = require('../backend/backend-api').instance;
const {GitHelper, mockClone, mockCheckout, mockGetLastCommit} = require('../git/git-helper');

const {mockRequest, mockResponse} = require('./http.mock');
jest.mock('../backend/backend-api.js');
jest.mock('../git/git-helper.js');

describe(`Settings controller works correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`get() return builds`, async () => {
    const stubSettings = {
      id: `3fa85f64-5717-4562-b3fc-2c963f66afa6`,
      repoName: `mpoliakov/shri-2020-task-1`,
      buildCommand: `npm i && npm run build`,
      mainBranch: `master`,
      period: 10,
    };

    const req = mockRequest();
    const res = mockResponse();

    await settingsController.get(req, res);

    expect(res.json).toHaveBeenCalledWith(stubSettings);
  });

  it(`save() creates new build request by commit hash`, async () => {
    const stubSettings = {
      repoName: `mpoliakov/shri-2020-task-1`,
      buildCommand: `npm i && npm run build`,
      mainBranch: `master`,
      period: 10,
    };

    const stubCommit = {
      hash: `asd1234`,
      message: `Very important fix`,
      branch: `master`,
      author: `Max Poliakov`
    };

    const stubBuildInfo = {
      'id': 'a1c39d08-e5ef-47b4-918b-76ee4f3ccaea',
      'buildNumber': 1,
      'status': 'Waiting'
    };

    const req = mockRequest({
      body: stubSettings
    });
    const res = mockResponse();

    await settingsController.save(req, res);

    expect(GitHelper).toHaveBeenCalledWith(stubSettings.repoName);
    expect(mockClone).toHaveBeenCalledTimes(1);
    expect(mockCheckout).toHaveBeenCalledWith(stubSettings.mainBranch);
    expect(mockGetLastCommit).toHaveBeenCalledTimes(1);

    expect(backendAPI.saveSettings).toHaveBeenCalledWith(stubSettings);

    expect(backendAPI.requestBuild).toHaveBeenCalledTimes(1);
    expect(backendAPI.requestBuild).toHaveBeenCalledWith({
      commitHash: stubCommit.hash,
      commitMessage: stubCommit.message,
      branchName: stubCommit.branch,
      authorName: stubCommit.author
    });
    expect(res.json).toHaveBeenCalledWith(stubSettings);
  });
});
