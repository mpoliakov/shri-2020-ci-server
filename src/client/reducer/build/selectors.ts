import Namespace from '../namespace';
import {AppState} from '../reducer';

export const getBuild = (state: AppState): BuildEntity | null => state[Namespace.BUILD].build;

export const getLog = (state: AppState): BuildLog  => state[Namespace.BUILD].log;
