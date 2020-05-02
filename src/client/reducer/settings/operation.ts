import {ActionCreator} from '@reducer/settings/reducer';
import {AppThunk} from '../../typings';

const Operation = {
  loadSettings: (): AppThunk<void> => async (dispatch, getState, api) => {
    const res = await api.get(`/settings`);
    return dispatch(ActionCreator.setSettings(res.data));
  },
  saveSettings: (settings: SettingsRequest): AppThunk<void> => async (dispatch, getState, api) => {
    try {
      const res = await api.post(`/settings`, settings);

      return dispatch(ActionCreator.setSettings(res.data));
    }
    catch (err) {
      dispatch(ActionCreator.setError(err.response.data));
      throw new Error(err.response.data);
    }
  }
};

export default Operation;
