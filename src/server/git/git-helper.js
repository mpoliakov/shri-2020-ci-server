const fs = require('fs');
const path = require('path');
const git = require('simple-git/promise');

class GitHelper {
  constructor(repoPath) {
    const appDir = path.dirname(require.main.filename);
    const repoDirPath = path.resolve(appDir, 'git/repo'); // for now git repository is stored locally

    this._localPath = path.resolve(repoDirPath, repoPath);
    this._githubPath = 'http://github.com/' + repoPath;
  }

  clone() {
    return fs.promises.access(repoDirPath)
      .catch(() => fs.promises.mkdir(repoDirPath).then(() => git().clone(this._githubPath, this._localPath)))
      .then(() => fs.promises.access(this._localPath))
      .then(() => git().clone(this._githubPath, this._localPath))
      .catch(() => git(this._localPath).pull());
  }

  getLastCommit(branch) {
    return git(this._localPath).log(['-n', '1', branch]).then((data) => data.latest);
  }

  getCommit(hash) {
    return git(this._localPath).log(['-1', hash]).then((data) => data.latest);
  }
}

module.exports = GitHelper;
