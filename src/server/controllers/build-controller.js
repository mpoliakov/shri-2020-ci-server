const GitHelper = require('../git/git-helper');
const backendAPI = require('../backend/backend-api');
const buildService = require('../builds/build-service');
const Utils = require('../utils');

exports.getList = async (req, res) => {
  let data = null;

  try {
    data = await backendAPI.getBuildList();
  }
  catch (err) {
    console.error(err.response.data);
    return res.status(err.response.data.status).json(err.response.data);
  }

  return res.json(data.data);
};

exports.getDetails = async (req, res) => {
  const buildId = req.params.buildId;
  let data = null;

  try {
    data = await backendAPI.getBuild(buildId);
  }
  catch (err) {
    console.error(err.response.data);
    return res.status(err.response.data.status).json(err.response.data);
  }

  return res.json(data.data);
};

exports.getLog = async (req, res) => {
  const buildId = req.params.buildId;

  try {
    await Utils.delay(500); // TODO: remove
    return res.send(buildService.getLog(buildId));
  }
  catch (err) {
    console.error(err.response.data);
    return res.status(err.response.data.status).json(err.response.data);
  }

  return res.end();
};

exports.request = (req, res) => {
  // Add build to queue (Backend API: POST /build/request) --> set build.status
  // Build module --- for now should be mocked (setTimeout)
  // Start build (Backend API: POST /build/start) --> set build.status, build.start
  // Build module --- for now should be mocked (setTimeout)
  // Finish build (Backend API: POST /build/finish) -- set build.status, build.duration

  const hash = req.params.commitHash;

  backendAPI.getSettings()
    .then((settings) => new GitHelper(settings.repoName).getCommit(hash))
    .then((commit) => {
      console.log(commit);
      return backendAPI.requestBuild({
        commitMessage: commit.message,
        commitHash: commit.hash,
        branchName: 'master', //commit.refs, --- there is a problem to find branch by commit hash, it can be in several branches at the same time
        authorName: commit.author_name
      });
    })
    .then(() => {
      res.status(200).send('Success');
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
};
