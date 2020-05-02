import './header.scss';
import '../Container/container.scss';

import React from 'react';

export interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({children}) => (
  <header className="header container">
    {children}
  </header>
);

export default React.memo(Header);
