const dotenv = require('dotenv');
const BackendAPI = require('./backend/backend-api');
const GitHelper = require('./git/git-helper');

// TODO: Do not init BackendAPI and GitHelper in each controller - should be something like factory
dotenv.config();
const backendAPI = new BackendAPI(process.env.AUTH_TOKEN);

exports.get = (req, res) => {
  // Read settings (Backend API: GET /conf)
  backendAPI.getConf().then((data) => {
    res.json(data);
  });
};

exports.save = (req, res) => {
  // 1. Save settings (Backend API: POST /conf). If there is already saved settings, should be edited (or deleted and created new?)
  // 2. Clone git repository
  // 3. Get last commit
  // 4. Request build (Backend API: POST /build/request)

  const settings = req.body;
  const gitHelper = new GitHelper(settings.repoName);

  backendAPI.saveConf(settings)
    .then(() => gitHelper.clone())
    .then(() => gitHelper.getLastCommit(settings.mainBranch))
    .then((commit) => backendAPI.requestBuild({
      commitMessage: commit.message,
      commitHash: commit.hash,
      branchName: settings.mainBranch, // or use commit.refs = 'HEAD -> master, origin/master, origin/HEAD'
      authorName: commit.author_name
    }))
    .then(() => {
      res.status(200).send('Success');
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
};
