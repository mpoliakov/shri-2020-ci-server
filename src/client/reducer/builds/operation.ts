import {ActionCreator} from '@reducer/builds/reducer';
import {AppThunk} from '../../typings';

const Operation = {
  loadBuilds: (): AppThunk<void> => async (dispatch, getState, api) => {
    const res = await api.get(`/builds`);
    return dispatch(ActionCreator.setBuilds(res.data));
  }
};

export default Operation;
