import './main.scss';
import '../Container/container.scss';

import React from 'react';
import classNames from 'classnames';

export interface MainProps {
  mod: string;
  children: React.ReactNode;
}

const Main = (props: MainProps) => {
  const className = classNames(
    'main',
    {
      [`main--${props.mod}`]: props.mod
    },
    'container'
  );

  return <main className={className}>
    {props.children}
  </main>;
};

export default React.memo(Main);
