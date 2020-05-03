import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {createAPI} from '@core/api';
import reducer from '@reducer/reducer';

import App from '@components/App/App';

const api = createAPI();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        (window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
    )
);

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </Provider>,
    document.getElementById(`root`)
);

/*
if ('serviceWorker' in navigator) {
  //navigator.serviceWorker.register('./service-worker.js', { scope: '/sw-test/' }).then(function(reg) {
  navigator.serviceWorker.register('./service-worker.js').then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    console.log('Registration failed with ' + error);
  });
}

import * as serviceWorker from './serviceWorker';
serviceWorker.register();
 */
