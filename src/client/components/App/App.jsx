import './App.scss';

import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux'

import history from '@core/history';
import {AppRoutes} from '@core/const';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PageStartScreen from '@components/Pages/PageStartScreen/PageStartScreen';
import PageSettings from '@components/Pages/PageSettings/PageSettings';
import PageBuildDetails from '@components/Pages/PageBuildDetails/PageBuildDetails';
import PageBuildHistory from '@components/Pages/PageBuildHistory/PageBuildHistory';

import SettingsOperation from '@reducer/settings/operation';
import {getSettings, getLoaded} from '@reducer/settings/selectors';

class App extends React.PureComponent {
  componentDidMount () {
    const {
      loadSettings,
    } = this.props;

    loadSettings();
  }

  render() {
    const {
      loaded,
      settings
    } = this.props;

    // Need flag to avoid glitching of the start screen while data is not loaded
    if (!loaded) {
      return null;
    }

    return <BrowserRouter history={history}>
      <Switch>
        <Route path={AppRoutes.HOME} exact render={() => (settings ? <PageBuildHistory/> : <PageStartScreen/>)}/>
        <Route path="/dev-start-screen" exact component={PageStartScreen}/>
        <Route path={AppRoutes.SETTINGS} exact component={PageSettings}/>
        <Route path={AppRoutes.BUILD + `/:number`} component={PageBuildDetails}/>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  loaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  settings: getSettings(state),
  loaded: getLoaded(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadSettings: () => {
    dispatch(SettingsOperation.loadSettings());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
