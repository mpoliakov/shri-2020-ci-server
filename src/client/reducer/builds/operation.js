import {delay} from 'Core/utils';
import {ActionCreator} from 'Reducer/builds/reducer';

import mockedBuilds from '../../mock/builds';

const Operation = {
  loadBuilds: () => (dispatch, getState, api) => {
    return delay(250).then(() => dispatch(ActionCreator.setBuilds(mockedBuilds)));
    // return api.get(`/builds`).then((data) => dispatch(ActionCreator.setBuilds(data)));
  }
};

export default Operation;
