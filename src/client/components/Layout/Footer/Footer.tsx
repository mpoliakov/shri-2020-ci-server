import './footer.scss';

import React from 'react';

import {withTranslation, WithTranslation} from 'react-i18next';

const Footer: React.FC<WithTranslation> = ({t, i18n}) => {
  const switchLangToRu = (evt: React.MouseEvent) => {
    evt.preventDefault();
    i18n.changeLanguage('ru');
  };

  const switchLangToEn = (evt: React.MouseEvent) => {
    evt.preventDefault();
    i18n.changeLanguage('en');
  };

  return (
    <footer className="footer">
      <div className="footer__container container">
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <a href="#">{t('footer.support')}</a>
          </li>
          <li className="footer__nav-item">
            <a href="#">{t('footer.learning')}</a>
          </li>
          {i18n.language === 'en' && <li className="footer__nav-item">
            <a href="#" onClick={switchLangToRu}>Русская версия</a>
          </li>}
          {i18n.language === 'ru' && <li className="footer__nav-item">
            <a href="#" onClick={switchLangToEn}>English version</a>
          </li>}
        </ul>
        <span className="footer__copyright">© 2020 Maksim Poliakov</span>
      </div>
    </footer>
  );
}

export default React.memo(withTranslation()(Footer));
