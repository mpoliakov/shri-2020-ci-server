import {ActionType, ActionCreator, reducer} from '@reducer/builds/reducer';

import stubBuilds from '@stub/builds';

describe(`builds/reducer`, () => {
  describe(`Action creators work correctly`, () => {
    it(`ActionCreator.setBuilds`, () => {
      expect(ActionCreator.setBuilds(stubBuilds)).toEqual({
        type: ActionType.SET_BUILDS,
        payload: stubBuilds
      });
    });
  });

  it(`Reducer without parameters returns initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      builds: []
    });
  });

  describe(`Reducer works correctly`, () => {
    it(`ActionType.SET_BUILDS`, () => {
      expect(reducer({
        builds: []
      }, {
        type: ActionType.SET_BUILDS,
        payload: stubBuilds
      })).toEqual({
        builds: stubBuilds
      });
    });
  });
});
