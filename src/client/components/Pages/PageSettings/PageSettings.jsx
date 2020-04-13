import './build-settings.scss';

import React from 'react';

import Header from '@components/Layout/Header/Header';
import Main from '@components/Layout/Main/Main';
import Footer from '@components/Layout/Footer/Footer';
import H1 from '@components/Controls/Heading/H1/H1';
import H3 from '@components/Controls/Heading/H3/H3';
import FormSettings from '@components/Forms/FormSettings/FormSettings';

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
