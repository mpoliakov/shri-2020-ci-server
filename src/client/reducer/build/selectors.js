import Namespace from '../namespace';

export const getBuild = (state) => state[Namespace.BUILD].build;

export const getLog = (state) => state[Namespace.BUILD].log;
