import './placeholder.scss';

import React from 'react';

import {Link} from 'react-router-dom';
import {AppRoutes} from 'Core/const';

import Header from 'Comp/Layout/Header/Header';
import Main from 'Comp/Layout/Main/Main';
import Footer from 'Comp/Layout/Footer/Footer';
import H1 from 'Comp/Controls/Heading/H1/H1';
import IconSettings from 'Comp/Controls/Icons/IconSettings/IconSettings';

const PageStartScreen = () => (
  <React.Fragment>
    <Header>
      <H1 mix="header__heading">School CI Server</H1>
      <Link className="btn btn--small btn--with-icon" to={AppRoutes.SETTINGS}>
        <IconSettings mix="btn__icon icon icon--btn"/>
        <span className="btn__text">Settings</span>
      </Link>
    </Header>
    <Main mod={`start-screen`}>
      <div className="main__placeholder placeholder">
        <img className="placeholder__image" src="img/settings-logo.svg" height="124" width="124" alt="Settings logo" />
        <p className="placeholder__text">Configure repository connection<br />and synchronization settings</p>
        <Link className="placeholder__call-to-action btn btn--accent" to={AppRoutes.SETTINGS}>Open settings</Link>
      </div>
    </Main>
    <Footer/>
  </React.Fragment>
);

export default React.memo(PageStartScreen);
