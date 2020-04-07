import {combineReducers} from 'redux';
import Namespace from './namespace';
import {reducer as build} from './build/reducer';
import {reducer as builds} from './builds/reducer';
import {reducer as settings} from './settings/reducer';

export default combineReducers({
  [Namespace.BUILD]: build,
  [Namespace.BUILDS]: builds,
  [Namespace.SETTINGS]: settings
});
