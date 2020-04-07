import {delay} from 'Core/utils';
import {ActionCreator} from 'Reducer/settings/reducer';

const Operation = {
  loadSettings: () => (dispatch, getState, api) => {
    return api.get(`/settings`)
      .then((res) => dispatch(ActionCreator.setSettings(res.data)));
  },
  saveSettings: (settings) => (dispatch, getState, api) => {
    return delay(2000).then(() => {
      return api.post(`/settings`, {
        repoName: settings.repoName,
        buildCommand: settings.buildCommand,
        mainBranch: settings.mainBranch,
        period: settings.period
      })
        .then((res) => dispatch(ActionCreator.setSettings(res.data)));
    });
  }
};

export default Operation;
