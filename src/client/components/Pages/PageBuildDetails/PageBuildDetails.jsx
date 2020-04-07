import React from 'react';

import {connect} from 'react-redux';

import {AppRoutes} from 'Core/const';
import {Link} from 'react-router-dom';

import Header from 'Comp/Layout/Header/Header';
import Main from 'Comp/Layout/Main/Main';
import Footer from 'Comp/Layout/Footer/Footer';
import H2 from 'Comp/Controls/Heading/H2/H2';
import Btn from 'Comp/Controls/Buttons/Btn/Btn';
import IconSettings from 'Comp/Controls/Icons/IconSettings/IconSettings';
import IconRebuild from 'Comp/Controls/Icons/IconRebuild/IconRebuild';
import BuildLog from 'Comp/Build/BuildLog/BuildLog';
import BuildCard from 'Comp/Build/BuildCard/BuildCard';

import {ActionCreator} from 'Reducer/build/reducer';
import SettingsOperation from 'Reducer/settings/operation';
import BuildOperation from 'Reducer/build/operation';
import {getBuild, getLog} from 'Reducer/build/selectors';
import {getSettings} from 'Reducer/settings/selectors';

class PageBuildDetails extends React.PureComponent {
  componentDidMount() {
    const {
      match,
      settings,
      loadSettings,
      loadData,
    } = this.props;

    if (!settings) {
      loadSettings();
    }

    const buildNumber = Number(match.params.number);
    loadData(buildNumber);
  }

  componentWillUnmount() {
    const {
      resetData
    } = this.props;

    resetData();
  }

  render() {
    const {
      settings,
      build,
      log,
      handleSubmit
    } = this.props;

    if (!settings || !build) {
      return null;
    }

    return <React.Fragment>
      <Header>
        <h1 className="visually-hidden">School CI Server</h1>
        <H2 mix="header__heading">{settings.repoName}</H2>
        <form action="/" method="post" onSubmit={handleSubmit}>
          <input type="hidden" name="commitHash" value={build.commitHash}/>
          <button className="btn btn--small btn--with-icon" type="submit">
            <IconRebuild mix="btn__icon icon--btn"/>
            <span className="btn__text">Rebuild</span>
          </button>
        </form>
        <Link className="btn btn--small btn--with-icon" to={AppRoutes.SETTINGS} title="Settings">
          <IconSettings mix="btn__icon icon--btn"/>
          <span className="btn__text">Settings</span>
        </Link>
      </Header>
      <Main mod={`build-details`}>
        <BuildCard build={build}/>
        <BuildLog log={log}/>
      </Main>
      <Footer/>
    </React.Fragment>;
  }
}

const mapStateToProps = (state) => ({
  settings: getSettings(state),
  build: getBuild(state),
  log: getLog(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadSettings: () => {
    dispatch(SettingsOperation.loadSettings());
  },
  loadData: (buildNumber) => {
    dispatch(BuildOperation.loadBuild(buildNumber));
    dispatch(BuildOperation.loadLog(buildNumber));
  },
  resetData: () => {
    dispatch(ActionCreator.setBuild(null));
    dispatch(ActionCreator.setLog(null));
  },
  handleSubmit: (evt) => {
    evt.preventDefault();

    /*dispatch(Operation.addBuild({
      commitHash: evt.target.commitHash.value,
    }))
      .then((build) => ownProps.history.push(AppRoutes.BUILD + `/` + build.buildNumber));*/
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PageBuildDetails);
