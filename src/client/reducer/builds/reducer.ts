import {extend} from '@core/utils';

const initialState: BuildsState = {
  builds: []
}

enum ActionType {
  SET_BUILDS = `SET_BUILDS`
}

interface Action {
  type: ActionType;
  payload: Array<BuildEntity>;
}

const ActionCreator = {
  setBuilds: (builds: Array<BuildEntity>) => ({
    type: ActionType.SET_BUILDS,
    payload: builds
  })
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_BUILDS:
      return extend(state, {
        builds: action.payload
      });
  }

  return state;
};

export {
  ActionType,
  ActionCreator,
  reducer,
};
