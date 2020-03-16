const dotenv = require('dotenv');
const BackendAPI = require('./backend/backend-api');
const GitHelper = require('./git/git-helper');

// TODO: Do not init BackendAPI and GitHelper in each controller - should be something like factory
dotenv.config();
const backendAPI = new BackendAPI(process.env.AUTH_TOKEN);

exports.getList = (req, res) => {
  backendAPI.getBuilds().then((data) => {
    res.json(data);
  });
};

exports.getBuildDetails = (req, res) => {
  backendAPI.getBuildDetails(req.params.buildId).then((data) => {
    res.json(data);
  });
};

exports.getBuildLog = (req, res) => {
  backendAPI.getBuildLog(req.params.buildId).then((data) => {
    res.send(data);
  });
};

exports.addBuild = (req, res) => {
  // Add build to queue (Backend API: POST /build/request) --> set build.status
  // Build module --- for now should be mocked (setTimeout)
  // Start build (Backend API: POST /build/start) --> set build.status, build.start
  // Build module --- for now should be mocked (setTimeout)
  // Finish build (Backend API: POST /build/finish) -- set build.status, build.duration

  const hash = req.params.commitHash;

  backendAPI.getConf()
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
}
