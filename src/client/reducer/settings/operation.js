import {ActionCreator} from 'Reducer/settings/reducer';

const Operation = {
  loadSettings: () => async (dispatch, getState, api) => {
    const res = await api.get(`/settings`);
    return dispatch(ActionCreator.setSettings(res.data));
  },
  saveSettings: (settings) => async (dispatch, getState, api) => {
    try {
      const res = await api.post(`/settings`, {
        repoName: settings.repoName,
        buildCommand: settings.buildCommand,
        mainBranch: settings.mainBranch,
        period: settings.period
      });

      return dispatch(ActionCreator.setSettings(res.data));
    }
    catch (err) {
      dispatch(ActionCreator.setError(err.response.data));
      throw new Error(err.response.data);
    }
  }
};

export default Operation;
