import Namespace from '../namespace';
import {AppState} from '../reducer';

export const getSettings = (state: AppState): SettingsEntity | null => state[Namespace.SETTINGS].settings;

export const getLoaded = (state: AppState): boolean => state[Namespace.SETTINGS].loaded;

export const getLoading = (state: AppState): boolean => state[Namespace.SETTINGS].loading;

export const getError = (state: AppState): ErrorMessage => state[Namespace.SETTINGS].error;
