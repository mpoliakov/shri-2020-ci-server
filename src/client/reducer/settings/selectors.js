import Namespace from '../namespace';

export const getSettings = (state) => state[Namespace.SETTINGS].settings;

export const getLoaded = (state) => state[Namespace.SETTINGS].loaded;

export const getLoading = (state) => state[Namespace.SETTINGS].loading;

export const getError = (state) => state[Namespace.SETTINGS].error;
