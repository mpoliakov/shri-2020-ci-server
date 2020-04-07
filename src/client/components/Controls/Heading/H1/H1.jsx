import '../heading.scss';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const H1 = (props) => {
  const className = classNames(props.mix, `heading`, `heading--h1`);

  return <h1 className={className}>
    {props.children}
  </h1>;
};

H1.propTypes = {
  mix: PropTypes.string
};

export default React.memo(H1);
