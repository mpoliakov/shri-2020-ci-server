import './header.scss';
import '../Container/container.scss';

import React from 'react';

const Header = (props) => (
  <header className="header container">
    {props.children}
  </header>
);

export default React.memo(Header);
