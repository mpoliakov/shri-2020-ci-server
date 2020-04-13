import './build-history.scss';

import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoutes} from '@core/const';

import Header from '@components/Layout/Header/Header';
import Main from '@components/Layout/Main/Main';
import Footer from '@components/Layout/Footer/Footer';
import Modal from '@components/Modal/Modal';
import H2 from '@components/Controls/Heading/H2/H2';
import IconSettings from '@components/Controls/Icons/IconSettings/IconSettings';
import FormRunBuild from '@components/Forms/FormRunBuild/FormRunBuild';
import BuildCard from '@components/Build/BuildCard/BuildCard';

import {getSettings} from '@reducer/settings/selectors';
import {getBuilds} from '@reducer/builds/selectors';
import BuildsOperation from '@reducer/builds/operation';

class PageBuildHistory extends React.PureComponent {
  componentDidMount() {
    const {
      loadBuilds
    } = this.props;

    loadBuilds();
  }

  render() {
    const {
      settings,
      builds
    } = this.props;

    if (!settings || !builds) {
      return;
    }

    return <React.Fragment>
      <Header>
        <h1 className="visually-hidden">School CI Server</h1>
        <H2 mix="header__heading">{settings.repoName}</H2>
        <Modal>
          <FormRunBuild/>
        </Modal>
        <Link className="btn btn--small btn--icon-only" to={AppRoutes.SETTINGS} title="Settings">
          <IconSettings mix="btn__icon icon--btn"/>
          <span className="btn__text">Settings</span>
        </Link>
      </Header>
      <Main mod={`build-history`}>
        <ul className="build-history">
          {builds.map((build) => (
            <li key={build.id} className="build-history__item">
              <Link className="build-history__item" to={AppRoutes.BUILD + `/` + build.buildNumber}>
                <BuildCard build={build} isCompact={true}/>
              </Link>
            </li>
          ))}
        </ul>
        <button className="build-history__show-more-btn btn btn--small" type="button">Show more</button>
      </Main>
      <Footer/>
    </React.Fragment>;
  }
}

PageBuildHistory.propTypes = {
  settings: PropTypes.shape({
    repoName: PropTypes.string,
  }),
  builds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    configurationId: PropTypes.string.isRequired,
    buildNumber: PropTypes.number.isRequired,
    commitMessage: PropTypes.string.isRequired,
    commitHash: PropTypes.string.isRequired,
    branchName: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    status: PropTypes.oneOf([`Waiting`, `InProgress`, `Success`, `Fail`, `Canceled`]),
    start: PropTypes.string,
    duration: PropTypes.number
  })),
};

const mapStateToProps = (state) => ({
  settings: getSettings(state),
  builds: getBuilds(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBuilds: () => {
    dispatch(BuildsOperation.loadBuilds());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageBuildHistory);
