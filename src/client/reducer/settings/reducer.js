import {extend} from 'Core/utils';

const initialState = {
  settings: null,
  loaded: false // we need to check if there are settings on backend, they can be empty
};

const ActionType = {
  SET_SETTINGS: `SET_SETTINGS`
};

const ActionCreator = {
  setSettings: (settings) => ({
    type: ActionType.SET_SETTINGS,
    payload: settings
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SETTINGS:
      return extend(state, {
        settings: action.payload,
        loaded: true
      });
  }

  return state;
};

export {
  ActionType,
  ActionCreator,
  reducer,
};
