const GitHelper = require('../git/git-helper');
const backendAPI = require('../backend/backend-api');

exports.get = async (req, res) => {
  let data = null;

  try {
    data = await backendAPI.getSettings();
  }
  catch (err) {
    console.error(err.response.data);
    return res.status(err.response.data.status).json(err.response.data);
  }

  return res.json(data.data);
};

// 1. Save settings (Backend API: POST /conf). If there is already saved settings, should be edited (or deleted and created new?)
// 2. Clone git repository
// 3. Get last commit
// 4. Request build (Backend API: POST /build/request)
exports.save = async (req, res) => {
  const settings = req.body;

  const requestBody = {
    repoName: settings.repoName,
    buildCommand: settings.buildCommand,
    mainBranch: settings.mainBranch ? settings.mainBranch : `master`,
    period: isNaN(parseInt(settings.period)) ? 0 : parseInt(settings.period)
  };

  try {
    await backendAPI.saveSettings(requestBody);

    // const gitHelper = new GitHelper(settings.repoName);
    /*backendAPI.saveConf(settings)
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
      });*/
  }
  catch (err) {
    console.error(err.response.data);
    return res.status(err.response.data.status).json(err.response.data);
  }

  return res.json(requestBody);
};
