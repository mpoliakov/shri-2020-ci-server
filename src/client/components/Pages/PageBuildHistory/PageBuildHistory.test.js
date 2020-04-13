import React from 'react';
import renderer from 'react-test-renderer';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Namespace from '@reducer/namespace';
import {createAPI} from '@core/api';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import PageBuildHistory from './PageBuildHistory';
import stubBuilds from '@stub/builds';
import stubSettings from '@stub/settings'

const mockStore = configureStore([thunk.withExtraArgument(createAPI())]);

it(`<PageBuildHistory/> is rendered correctly`, () => {
  const store = mockStore({
    [Namespace.SETTINGS]: {
      settings: stubSettings,
      loaded: true
    },
    [Namespace.BUILDS]: {
      builds: stubBuilds
    }
  });

  const options = {
    createNodeMock: () => {
      return {};
    }
  };

  const component = renderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <PageBuildHistory/>
      </BrowserRouter>
    </Provider>,
  options).toJSON();

  expect(component).toMatchSnapshot();
});
