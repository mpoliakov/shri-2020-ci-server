import './footer.scss';

import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container container">
      <ul className="footer__nav">
        <li className="footer__nav-item">
          <a href="#">Support</a>
        </li>
        <li className="footer__nav-item">
          <a href="#">Learning</a>
        </li>
      </ul>
      <span className="footer__copyright">© 2020 Maksim Poliakov</span>
    </div>
  </footer>
);

export default React.memo(Footer);
