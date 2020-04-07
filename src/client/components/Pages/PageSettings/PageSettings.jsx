import './build-settings.scss';

import React from 'react';

import Header from 'Comp/Layout/Header/Header';
import Main from 'Comp/Layout/Main/Main';
import Footer from 'Comp/Layout/Footer/Footer';
import H1 from 'Comp/Controls/Heading/H1/H1';
import H3 from 'Comp/Controls/Heading/H3/H3';
import FormSettings from 'Comp/Forms/FormSettings/FormSettings';

const PageSettings = () => (
  <React.Fragment>
    <Header>
      <H1 mix="header__heading">School CI Server</H1>
    </Header>
    <Main mod="settings">
      <section className="build-settings">
        <H3 mix="build-settings__heading">Settings</H3>
        <p className="build-settings__text">Configure repository connection and synchronization settings.</p>
        <FormSettings/>
      </section>
    </Main>
    <Footer/>
  </React.Fragment>
);

export default PageSettings;
