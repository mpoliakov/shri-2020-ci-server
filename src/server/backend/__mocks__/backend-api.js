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

const stubSettings = {
  id: `3fa85f64-5717-4562-b3fc-2c963f66afa6`,
  repoName: `mpoliakov/shri-2020-task-1`,
  buildCommand: `npm i && npm run build`,
  mainBranch: `master`,
  period: 10,
};

const buildRequestResponse = {
  'id': 'a1c39d08-e5ef-47b4-918b-76ee4f3ccaea',
  'buildNumber': 1,
  'status': 'Waiting'
}

const instance = {
  getSettings: jest.fn().mockImplementation(() => Promise.resolve({
    data: stubSettings
  })),
  saveSettings: jest.fn(),
  getBuildList: jest.fn().mockImplementation(() => Promise.resolve({
    data: stubBuilds
  })),
  getBuild: jest.fn().mockImplementation(() => Promise.resolve({
    data: stubBuild
  })),
  requestBuild: jest.fn().mockImplementation(() => Promise.resolve({
    data: buildRequestResponse
  }))
};

module.exports = {
  instance
};

