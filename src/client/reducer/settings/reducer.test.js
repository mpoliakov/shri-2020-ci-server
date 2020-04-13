import {ActionType, ActionCreator, reducer} from '@reducer/settings/reducer';

import stubSettings from '@stub/settings';

describe(`settings/reducer`, () => {
  describe(`Action creators work correctly`, () => {
    it(`ActionCreator.setSettings`, () => {
      expect(ActionCreator.setSettings(stubSettings)).toEqual({
        type: ActionType.SET_SETTINGS,
        payload: stubSettings
      });
    });

    it(`ActionCreator.setError`, () => {
      expect(ActionCreator.setError(`Error message.`)).toEqual({
        type: ActionType.SET_ERROR,
        payload: `Error message.`
      });
    });

    it(`ActionCreator.startLoading`, () => {
      expect(ActionCreator.startLoading()).toEqual({
        type: ActionType.START_LOADING,
        payload: true
      });
    });
  });

  it(`Reducer without parameters returns initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      settings: null,
      loaded: false,
      loading: false,
      error: null,
    });
  });

  describe(`Reducer works correctly`, () => {
    it(`ActionType.SET_SETTINGS`, () => {
      expect(reducer({
        settings: null,
        loaded: false,
        loading: false,
        error: null,
      }, {
        type: ActionType.SET_SETTINGS,
        payload: stubSettings
      })).toEqual({
        settings: stubSettings,
        loaded: true,
        loading: false,
        error: null,
      });
    });

    it(`ActionType.SET_ERROR`, () => {
      expect(reducer({
        settings: null,
        loaded: false,
        loading: false,
        error: null,
      }, {
        type: ActionType.SET_ERROR,
        payload: `Error message.`
      })).toEqual({
        settings: null,
        loaded: false,
        loading: false,
        error: `Error message.`,
      });
    });

    it(`ActionType.START_LOADING`, () => {
      expect(reducer({
        settings: null,
        loaded: false,
        loading: false,
        error: null,
      }, {
        type: ActionType.START_LOADING,
        payload: true
      })).toEqual({
        settings: null,
        loaded: false,
        loading: true,
        error: null,
      });
    });
  });
});
