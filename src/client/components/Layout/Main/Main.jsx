import './main.scss';
import '../Container/container.scss';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Main = (props) => {
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

Main.propTypes = {
  mod: PropTypes.string
};

export default React.memo(Main);
