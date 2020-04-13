import {ActionType, ActionCreator, reducer} from '@reducer/build/reducer';

import stubBuild from '@stub/build';
import stubLog from '@stub/log';

describe(`build/reducer`, () => {
  describe(`Action creators work correctly`, () => {
    it(`ActionCreator.setBuild`, () => {
      expect(ActionCreator.setBuild(stubBuild)).toEqual({
        type: ActionType.SET_BUILD,
        payload: stubBuild
      });
    });

    it(`ActionCreator.setLog`, () => {
      expect(ActionCreator.setLog(stubLog)).toEqual({
        type: ActionType.SET_LOG,
        payload: stubLog
      });
    });
  });

  it(`Reducer without parameters returns initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      build: null,
      log: null
    });
  });

  describe(`Reducer works correctly`, () => {
    it(`ActionType.SET_BUILD`, () => {
      expect(reducer({
        build: null,
        log: null
      }, {
        type: ActionType.SET_BUILD,
        payload: stubBuild
      })).toEqual({
        build: stubBuild,
        log: null
      });
    });

    it(`ActionType.SET_LOG`, () => {
      expect(reducer({
        build: null,
        log: null
      }, {
        type: ActionType.SET_LOG,
        payload: stubLog
      })).toEqual({
        build: null,
        log: stubLog
      });
    });
  });
});
