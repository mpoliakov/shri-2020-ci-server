import {extend} from '@core/utils';

const initialState = {
  build: null,
  log: null
};

const ActionType = {
  SET_BUILD: `SET_BUILD`,
  SET_LOG: `SET_LOG`
};

const ActionCreator = {
  setBuild: (build) => ({
    type: ActionType.SET_BUILD,
    payload: build
  }),
  setLog: (log) => ({
    type: ActionType.SET_LOG,
    payload: log
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_BUILD:
      return extend(state, {
        build: action.payload
      });
    case ActionType.SET_LOG:
      return extend(state, {
        log: action.payload
      });
    default:
      return state;
  }
};

export {
  ActionType,
  ActionCreator,
  reducer,
};
