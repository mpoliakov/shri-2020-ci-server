import './build-settings.scss';

import React from 'react';

import {withTranslation, WithTranslation} from 'react-i18next';

import Header from '@components/Layout/Header/Header';
import Main from '@components/Layout/Main/Main';
import Footer from '@components/Layout/Footer/Footer';
import H1 from '@components/Controls/Heading/H1/H1';
import H3 from '@components/Controls/Heading/H3/H3';
import FormSettings from '@components/Forms/FormSettings/FormSettings';

const PageSettings: React.FC<WithTranslation> = ({t}) => (
  <React.Fragment>
    <Header>
      <H1 mix="header__heading">School CI Server</H1>
    </Header>
    <Main mod="settings">
      <section className="build-settings">
        <H3 mix="build-settings__heading">{t('page.settings.title')}</H3>
        <p className="build-settings__text">{t('page.settings.text')}</p>
        <FormSettings/>
      </section>
    </Main>
    <Footer/>
  </React.Fragment>
);

export default React.memo(withTranslation()(PageSettings));
