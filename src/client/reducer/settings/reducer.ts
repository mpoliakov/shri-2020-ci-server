import {extend} from '@core/utils';

const initialState: SettingsState = {
  settings: null,
  loaded: false,
  loading: false,
  error: null,
}

const enum ActionType {
  SET_SETTINGS = `SET_SETTINGS`,
  SET_ERROR = `SET_ERROR`,
  START_LOADING = `START_LOADING`
}

interface Action {
  type: ActionType,
  payload: SettingsEntity | ErrorMessage | boolean;
}

const ActionCreator = {
  setSettings: (settings: SettingsEntity): Action => ({
    type: ActionType.SET_SETTINGS,
    payload: settings
  }),
  setError: (error: string): Action => ({
    type: ActionType.SET_ERROR,
    payload: error
  }),
  startLoading: (): Action => ({
    type: ActionType.START_LOADING,
    payload: true
  }),
};

const reducer = (state: SettingsState = initialState, action: Action): SettingsState => {
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
  reducer
};
