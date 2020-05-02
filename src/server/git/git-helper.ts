import del from 'del';
import path from 'path';
import util from 'util';
import {exec} from 'child_process';
import {convertStdoutToCommitObj} from '../utils';

const execPromise = util.promisify(exec);

class GitHelper {
  private readonly _repoName: string;
  private readonly _repoDirPath: string;
  private readonly _repoPath: string;

  constructor(repoName: string) {
    this._repoName = repoName;
    this._repoDirPath = path.resolve(__dirname, 'repo');
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

  async checkout(branch: string) {
    try {
      await execPromise(`git checkout ${branch}`, {
        cwd: this._repoPath
      });
    } catch (err) {
      console.error(err.stderr);
      throw new Error(err.stderr);
    }
  }

  async getCommit(hash: string | undefined = undefined) {
    try {
      const command = `git log -1 --pretty=format:"%h|%an|%s|%D" ${hash ? hash : ''}`.trim(); // https://git-scm.com/docs/pretty-formats

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

export default GitHelper;
