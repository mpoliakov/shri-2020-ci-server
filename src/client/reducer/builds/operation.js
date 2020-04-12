import {ActionCreator} from 'Reducer/builds/reducer';

const Operation = {
  loadBuilds: () => async (dispatch, getState, api) => {
    const res = await api.get(`/builds`);
    return dispatch(ActionCreator.setBuilds(res.data));
  }
};

export default Operation;
