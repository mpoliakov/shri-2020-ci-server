import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {createAPI} from '@core/api';
import reducer from '@reducer/reducer';

import {I18nextProvider} from 'react-i18next';
import i18n from './i18n/i18n';

import App from '@components/App/App';

const api = createAPI();

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    ((window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <App/>
      </I18nextProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById(`root`)
);
