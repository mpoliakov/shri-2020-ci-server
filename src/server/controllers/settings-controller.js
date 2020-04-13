const {GitHelper} = require('../git/git-helper');
const backendAPI = require('../backend/backend-api').instance;
const handleError = require('./handle-error');

exports.get = async (req, res) => {
  try {
    const settings = await backendAPI.getSettings();
    return res.json(settings.data);
  } catch (err) {
    return handleError(res, err);
  }
};

exports.save = async (req, res) => {
  try {
    const settings = {
      repoName: req.body.repoName,
      buildCommand: req.body.buildCommand,
      mainBranch: req.body.mainBranch ? req.body.mainBranch : `master`,
      period: isNaN(parseInt(req.body.period)) ? 0 : parseInt(req.body.period)
    };

    // 1. Clone git repository
    const gitHelper = new GitHelper(settings.repoName);
    await gitHelper.clone();

    // 2. Get last commit
    await gitHelper.checkout(settings.mainBranch);
    const commit = await gitHelper.getLastCommit();

    // 3. Save settings (Backend API: POST /conf)
    await backendAPI.saveSettings(settings);

    // 4. Request build (Backend API: POST /build/request)
    await backendAPI.requestBuild({
      commitMessage: commit.message,
      commitHash: commit.hash,
      branchName: settings.mainBranch,
      authorName: commit.author
    });

    return res.json(settings);
  } catch (err) {
    return handleError(res, err);
  }
};
