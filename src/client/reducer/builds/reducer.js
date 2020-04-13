import {extend} from '@core/utils';

const initialState = {
  builds: []
};

const ActionType = {
  SET_BUILDS: `SET_BUILDS`
};

const ActionCreator = {
  setBuilds: (builds) => ({
    type: ActionType.SET_BUILDS,
    payload: builds
  })
};

const reducer = (state = initialState, action) => {
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
