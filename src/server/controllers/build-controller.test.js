const buildController = require('./build-controller');
const backendAPI = require('../backend/backend-api').instance;
const {GitHelper, mockGetCommit} = require('../git/git-helper');

const {mockRequest, mockResponse} = require('./http.mock');
jest.mock('../backend/backend-api.js');
jest.mock('../git/git-helper.js');

describe(`Build controller works correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`getList() return builds`, async () => {
    const stubBuilds = [
      {
        id: `3fa85f64-5717-4562-b3fc-2c963f66afa6`,
        configurationId: `3fa85f64-5717-4562-b3fc-2c963f66afa6`,
        buildNumber: 1368,
        commitMessage: `add documentation for postgres scaler`,
        commitHash: `9c9f0b9`,
        branchName: `master`,
        authorName: `Philip Kirkorov`,
        status: `Success`,
        start: `2020-03-24T14:14:27.421Z`,
        duration: 15350
      },

      {
        id: `0ec4b231-0dec-47a3-9a1d-f6f74b869d53`,
        configurationId: `3fa85f64-5717-4562-b3fc-2c963f66afa6`,
        buildNumber: 1367,
        commitMessage: `Super cool UI kit for making websites that look like games`,
        commitHash: `952e5567`,
        branchName: `super-cool-ui-kit`,
        authorName: `Vadim Makeev`,
        status: `Fail`,
        start: `2020-03-24T10:15:27.421Z`,
        duration: 12500
      },
    ];

    const req = mockRequest();
    const res = mockResponse();

    await buildController.getList(req, res);

    expect(res.json).toHaveBeenCalledWith(stubBuilds);
  });

  it(`getDetails() returns build`, async () => {
    const stubBuild = {
      id: `3fa85f64-5717-4562-b3fc-2c963f66afa6`,
      configurationId: `3fa85f64-5717-4562-b3fc-2c963f66afa6`,
      buildNumber: 1368,
      commitMessage: `add documentation for postgres scaler`,
      commitHash: `9c9f0b9`,
      branchName: `master`,
      authorName: `Philip Kirkorov`,
      status: `Success`,
      start: `2020-03-24T14:14:27.421Z`,
      duration: 15350
    };

    const req = mockRequest({
      params: {
        buildId: stubBuild.id
      }
    });
    const res = mockResponse();

    await buildController.getDetails(req, res);

    expect(backendAPI.getBuild).toHaveBeenCalledTimes(1);
    expect(backendAPI.getBuild).toHaveBeenCalledWith(stubBuild.id);
    expect(res.json).toHaveBeenCalledWith(stubBuild);
  });

  it(`request() creates new build request by commit hash`, async () => {
    const stubSettings = {
      id: `3fa85f64-5717-4562-b3fc-2c963f66afa6`,
      repoName: `mpoliakov/shri-2020-task-1`,
      buildCommand: `npm i && npm run build`,
      mainBranch: `master`,
      period: 10,
    };

    const stubCommit = {
      hash: `qwert69`,
      message: `Refactoring`,
      branch: `branch`,
      author: `Max Poliakov`
    };

    const stubBuildInfo = {
      'id': 'a1c39d08-e5ef-47b4-918b-76ee4f3ccaea',
      'buildNumber': 1,
      'status': 'Waiting'
    };

    const req = mockRequest({
      body: {
        commitHash: stubCommit.hash
      }
    });
    const res = mockResponse();

    await buildController.request(req, res);

    expect(backendAPI.getSettings).toHaveBeenCalledTimes(1);
    expect(GitHelper).toHaveBeenCalledWith(stubSettings.repoName);
    expect(mockGetCommit).toHaveBeenCalledWith(stubCommit.hash);
    expect(backendAPI.requestBuild).toHaveBeenCalledTimes(1);
    expect(backendAPI.requestBuild).toHaveBeenCalledWith({
      commitHash: stubCommit.hash,
      commitMessage: stubCommit.message,
      branchName: stubCommit.branch,
      authorName: stubCommit.author
    });
    expect(res.json).toHaveBeenCalledWith(stubBuildInfo);
  });
});
