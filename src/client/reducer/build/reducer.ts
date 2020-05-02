import {extend} from '@core/utils';

const initialState: BuildState = {
  build: null,
  log: null
}

enum ActionType {
  SET_BUILD = `SET_BUILD`,
  SET_LOG = `SET_LOG`
}

interface Action {
  type: ActionType;
  payload: BuildEntity | BuildLog | null | undefined;
}

const ActionCreator = {
  setBuild: (build: BuildEntity | null | undefined) => ({
    type: ActionType.SET_BUILD,
    payload: build
  }),
  setLog: (log: BuildLog) => ({
    type: ActionType.SET_LOG,
    payload: log
  })
};

const reducer = (state = initialState, action: Action) => {
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
