const del = require('del');
const path = require('path');
const util = require('util');
const {exec} = require('child_process');
const convertStdoutToCommitObj = require('../utils').convertStdoutToCommitObj;

const execPromise = util.promisify(exec);

class GitHelper {
  constructor(repoName) {
    this._repoName = repoName;
    const appDirPath = path.dirname(require.main.filename);
    this._repoDirPath = path.resolve(appDirPath, 'git/repo');
    this._repoPath = path.resolve(this._repoDirPath, this._repoName);
  }

  async clone() {
    try {
      await del(this._repoDirPath);
      const repoUrl = `git@github.com:${this._repoName}`;
      await execPromise(`git clone ${repoUrl} ${this._repoPath}`);
    } catch (err) {
      console.error(err.stderr);
      throw new Error(err.stderr);
    }
  }

  async checkout(branch) {
    try {
      await execPromise(`git checkout ${branch}`, {
        cwd: this._repoPath
      });
    } catch (err) {
      console.error(err.stderr);
      throw new Error(err.stderr);
    }
  }

  async getCommit(hash) {
    try {
      const command = hash ?
        `git log -1 --pretty=format:"%h|%an|%s|%D" ${hash}` :
        `git log -1 --pretty=format:"%h|%an|%s|%D"`; // https://git-scm.com/docs/pretty-formats

      const {stdout} =  await execPromise(command, {
        cwd: this._repoPath
      });

      return convertStdoutToCommitObj(stdout);
    } catch (err) {
      console.error(err.stderr);
      throw new Error(err.stderr);
    }
  }

  async getLastCommit() {
    return await this.getCommit();
  }
}

module.exports = {
  GitHelper
};
