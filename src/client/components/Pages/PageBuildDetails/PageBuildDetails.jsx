import React from 'react';

import {connect} from 'react-redux';
import {AppRoutes} from '@core/const';
import {Link} from 'react-router-dom';

import Header from '@components/Layout/Header/Header';
import Main from '@components/Layout/Main/Main';
import Footer from '@components/Layout/Footer/Footer';
import H2 from '@components/Controls/Heading/H2/H2';
import IconSettings from '@components/Controls/Icons/IconSettings/IconSettings';
import IconRebuild from '@components/Controls/Icons/IconRebuild/IconRebuild';
import BuildLog from '@components/Build/BuildLog/BuildLog';
import BuildCard from '@components/Build/BuildCard/BuildCard';

import {ActionCreator} from '@reducer/build/reducer';
import SettingsOperation from '@reducer/settings/operation';
import BuildOperation from '@reducer/build/operation';
import {getBuild, getLog} from '@reducer/build/selectors';
import {getSettings} from '@reducer/settings/selectors';

class PageBuildDetails extends React.PureComponent {
  componentDidMount() {
    const {
      match,
      build,
      loadBuild,
      loadLog,
    } = this.props;

    const buildNumber = Number(match.params.number);

    //if (!build || build.id !== buildNumber) {
      loadBuild(buildNumber);
      loadLog(buildNumber);
    //}
  }

  componentWillUnmount() {
    const {
      resetBuild,
      resetLog
    } = this.props;

    resetBuild();
    resetLog();
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
  loadBuild: (buildNumber) => {
    dispatch(BuildOperation.loadBuild(buildNumber));
  },
  loadLog: (buildId) => {
    dispatch(BuildOperation.loadLog(buildId));
  },
  resetBuild: () => {
    dispatch(ActionCreator.setBuild(null));
  },
  resetLog: () => {
    dispatch(ActionCreator.setLog(null));
  },
  handleSubmit: async (evt) => {
    evt.preventDefault();

    try {
      const build = await dispatch(BuildOperation.addBuild({
        commitHash: evt.target.commitHash.value,
      }));

      ownProps.history.push(AppRoutes.BUILD + `/` + build.buildNumber);
    } catch {
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PageBuildDetails);
