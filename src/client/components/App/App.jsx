import './App.scss';

import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux'

import history from 'Core/history';
import {AppRoutes} from 'Core/const';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PageStartScreen from 'Comp/Pages/PageStartScreen/PageStartScreen';
import PageSettings from 'Comp/Pages/PageSettings/PageSettings';
import PageBuildDetails from 'Comp/Pages/PageBuildDetails/PageBuildDetails';
import PageBuildHistory from 'Comp/Pages/PageBuildHistory/PageBuildHistory';

import SettingsOperation from 'Reducer/settings/operation';
import {getSettings, getLoadedFlag} from 'Reducer/settings/selectors';

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
  loaded: getLoadedFlag(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadSettings: () => {
    dispatch(SettingsOperation.loadSettings());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
