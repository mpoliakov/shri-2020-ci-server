import {delay} from 'Core/utils';
import {ActionCreator} from 'Reducer/build/reducer';

import mockedBuilds from '../../mock/builds';
import mockedLog from '../../mock/log';

const Operation = {
  loadBuild: (buildNumber) => (dispatch, getState, api) => {
    const mockedBuild = mockedBuilds.find((build) => build.buildNumber === buildNumber);
    return delay(250).then(() => dispatch(ActionCreator.setBuild(mockedBuild)));
    // return api.get(`/builds/${buildId}`).then((res) => dispatch(ActionCreator.setBuild(res.data)));
  },
  loadLog: (buildNumber) => (dispatch, getState, api) => {
    return delay(500).then(() => dispatch(ActionCreator.setLog(mockedLog)));
    // return api.get(`/builds/${buildId}/logs`).then((res) => dispatch(ActionCreator.setLog(res.data)));
  },
  addBuild: (commitHash) => (dispatch, getState, api) => {
    return api.post(`/builds`, {commitHash}).then((res) => dispatch(ActionCreator.setBuild(res.data)));
  },
};

export default Operation;
