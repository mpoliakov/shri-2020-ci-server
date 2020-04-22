const {GitHelper} = require('../git/git-helper');
const backendAPI = require('../backend/backend-api').instance;
const handleError = require('./handle-error');

exports.getList = async (req, res) => {
  try {
    const builds = await backendAPI.getBuildList();
    return res.json(builds.data);
  } catch (err) {
    return handleError(res, err);
  }
};

exports.getDetails = async (req, res) => {
  try {
    const buildId = req.params.buildId;
    const build = await backendAPI.getBuild(buildId);

    return res.json(build.data);
  } catch (err) {
    return handleError(res, err);
  }
};

exports.getLog = async (req, res) => {
  try {
    const buildId = req.params.buildId;
    const log = await backendAPI.getBuildLog(buildId);

    return res.send(log);
  } catch (err) {
    return handleError(res, err);
  }
};

exports.request = async (req, res) => {
  try {
    const hash = req.body.commitHash;

    // 1. Get commit from repository
    const settings = (await backendAPI.getSettings()).data;
    const gitHelper = new GitHelper(settings.repoName);
    const commit = await gitHelper.getCommit(hash);

    // 2. Request build
    const build = await backendAPI.requestBuild({
      commitMessage: commit.message,
      commitHash: commit.hash,
      branchName: commit.branch || settings.mainBranch,
      authorName: commit.author
    });

    return res.json(build.data);
  } catch (err) {
    return handleError(res, err);
  }
};
