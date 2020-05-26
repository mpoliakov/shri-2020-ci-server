import React from 'react';

import {connect} from 'react-redux';
import {AppRoutes} from '@core/const';
import {Link, match} from 'react-router-dom';

import {withTranslation, WithTranslation} from 'react-i18next';

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
import {AppState} from '@reducer/reducer';
import {AppDispatch} from '../../../typings';

interface Params {
  number: string | undefined
}

export interface PageBuildDetailsProps {
  match: match<Params>;
  settings: SettingsEntity | null;
  build: BuildEntity | null;
  log: BuildLog;
  loadSettings: () => void;
  loadBuild: (buildNumber: number) => void;
  loadLog: (buildNumber: number) => void;
  resetBuild: () => void;
  resetLog: () => void;
  handleSubmit: (evt: any) => void;
}

class PageBuildDetails extends React.PureComponent<PageBuildDetailsProps & WithTranslation> {
  componentDidMount() {
    const {
      match,
      loadBuild,
      loadLog,
    } = this.props;

    const buildNumber = Number(match.params.number);

    loadBuild(buildNumber);
    loadLog(buildNumber);
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
      handleSubmit,
      t
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
            <span className="btn__text">{t('button.rebuild')}</span>
          </button>
        </form>
        <Link className="btn btn--small btn--with-icon" to={AppRoutes.SETTINGS} title={t('button.settings')}>
          <IconSettings mix="btn__icon icon--btn"/>
          <span className="btn__text">{t('button.settings')}</span>
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

const mapStateToProps = (state: AppState) => ({
  settings: getSettings(state),
  build: getBuild(state),
  log: getLog(state),
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: any) => ({
  loadSettings: () => {
    dispatch(SettingsOperation.loadSettings());
  },
  loadBuild: (buildNumber: number) => {
    dispatch(BuildOperation.loadBuild(buildNumber));
  },
  loadLog: (buildNumber: number) => {
    dispatch(BuildOperation.loadLog(buildNumber));
  },
  resetBuild: () => {
    dispatch(ActionCreator.setBuild(null));
  },
  resetLog: () => {
    dispatch(ActionCreator.setLog(null));
  },
  // TODO: add submit form event type
  handleSubmit: async (evt: any) => {
    evt.preventDefault();

    try {
      const build = await dispatch(BuildOperation.addBuild(evt.target.commitHash.value));

      ownProps.history.push(AppRoutes.BUILD + `/` + build.buildNumber);
    } catch {
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PageBuildDetails));
