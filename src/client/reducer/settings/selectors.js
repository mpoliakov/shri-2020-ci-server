import Namespace from '../namespace';

export const getSettings = (state) => state[Namespace.SETTINGS].settings;

export const getLoadedFlag = (state) => state[Namespace.SETTINGS].loaded;
