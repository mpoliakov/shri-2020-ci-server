import Namespace from '../namespace';
import {AppState} from '../reducer';

export const getBuilds = (state: AppState): Array<BuildEntity> => state[Namespace.BUILDS].builds;
