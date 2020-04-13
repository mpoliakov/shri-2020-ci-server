import {extend} from '@core/utils';

const initialState = {
  settings: null,
  loaded: false, // we need to check if there are settings on backend, they can be empty
  loading: false,
  error: null,
};

const ActionType = {
  SET_SETTINGS: `SET_SETTINGS`,
  SET_ERROR: `SET_ERROR`,
  START_LOADING: `START_LOADING`
};

const ActionCreator = {
  setSettings: (settings) => ({
    type: ActionType.SET_SETTINGS,
    payload: settings
  }),
  setError: (error) => ({
    type: ActionType.SET_ERROR,
    payload: error
  }),
  startLoading: () => ({
    type: ActionType.START_LOADING,
    payload: true
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SETTINGS:
      return extend(state, {
        settings: action.payload,
        loaded: true,
        loading: false
      });
    case ActionType.SET_ERROR:
      return extend(state, {
        error: action.payload,
        loading: false
      })
    case ActionType.START_LOADING:
      return extend(state, {
        loading: action.payload
      })
  }

  return state;
};

export {
  ActionType,
  ActionCreator,
  reducer,
};
