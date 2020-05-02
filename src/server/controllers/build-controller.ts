import {Request, Response} from 'express';
import GitHelper from '../git/git-helper';
import backendAPI from '../backend/backend-api-instance';
import handleError from './handle-error';

export default {
  getList: async (req: Request, res: Response) => {
    try {
      const builds = await backendAPI.getBuildList();
      return res.json(builds);
    } catch (err) {
      return handleError(res, err);
    }
  },

  getDetails: async (req: Request, res: Response) => {
    try {
      const buildId = req.params.buildId;
      const build = await backendAPI.getBuild(buildId);

      return res.json(build);
    } catch (err) {
      return handleError(res, err);
    }
  },

  getLog: async (req: Request, res: Response) => {
    try {
      const buildId = req.params.buildId;
      const log = await backendAPI.getBuildLog(buildId);

      return res.send(log);
    } catch (err) {
      return handleError(res, err);
    }
  },

  request: async (req: Request, res: Response) => {
    try {
      const hash = req.body.commitHash;

      // 1. Get commit from repository
      const settings = await backendAPI.getSettings();

      if (!settings) {
        throw 'Settings are not defined.';
      }

      const gitHelper = new GitHelper(settings.repoName);
      const commit = await gitHelper.getCommit(hash);

      // 2. Request build
      const build = await backendAPI.requestBuild({
        commitMessage: commit.message,
        commitHash: commit.hash,
        branchName: commit.branch || settings.mainBranch,
        authorName: commit.author
      });

      return res.json(build);
    } catch (err) {
      return handleError(res, err);
    }
  }
}
