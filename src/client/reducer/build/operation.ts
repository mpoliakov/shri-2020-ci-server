import {ActionCreator} from '@reducer/build/reducer';
import {getBuilds} from '@reducer/builds/selectors';
import {AppThunk} from '../../typings';

const Operation = {
  loadBuild: (buildNumber: number): AppThunk<void> => async (dispatch, getState, api) => {
    let builds = getBuilds(getState());
    let build = builds.find((i) => i.buildNumber === buildNumber);

    if (!build) {
      const buildsRes = await api.get(`/builds`);
      builds = buildsRes.data;
      build = builds.find((i) => i.buildNumber === buildNumber);
    }

    if (!build) {
      return;
    }

    const buildRes = await api.get(`/builds/${build.id}`);
    build = buildRes.data;

    return dispatch(ActionCreator.setBuild(build));
  },
  loadLog: (buildNumber: number): AppThunk<void> => async (dispatch, getState, api) => {
    let builds = getBuilds(getState());
    let build = builds.find((i) => i.buildNumber === buildNumber);

    if (!build) {
      const buildsRes = await api.get(`/builds`);
      builds = buildsRes.data;
      build = builds.find((i) => i.buildNumber === buildNumber);
    }

    if (!build) {
      return;
    }

    const logRes = await api.get(`/builds/${build.id}/logs`);

    return dispatch(ActionCreator.setLog(logRes.data));
  },
  addBuild: (commitHash: string): AppThunk<Promise<BuildEntity>> => async (dispatch, getState, api) => {
    let build = await api.post(`/builds`, {
      commitHash
    });
    build = await api.get(`/builds/${build.data.id}`);
    dispatch(ActionCreator.setBuild(build.data));
    return Promise.resolve(build.data);
  },
};

export default Operation;
