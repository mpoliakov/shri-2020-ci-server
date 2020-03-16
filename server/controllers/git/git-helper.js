const fs = require('fs');
const path = require('path');
const git = require('simple-git/promise');

const appDir = path.dirname(require.main.filename);

class GitHelper {
  constructor(repoPath) {
    this._localPath = path.resolve(appDir, 'repo', repoPath);
    this._githubPath = 'http://github.com/' + repoPath;
  }

  clone() {
    return fs.promises.access(this._localPath)
      .then(() => git().clone(this._githubPath, this._localPath))
      .catch(() => git(this._localPath).pull());
  }

  log(params) {
    return git(this._localPath).log(params);
  }

  getLastCommit(branch) {
    return git(this._localPath).log(['-n', '1', branch]).then((data) => data.latest);
  }
}

module.exports = GitHelper;
