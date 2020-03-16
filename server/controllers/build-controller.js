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
