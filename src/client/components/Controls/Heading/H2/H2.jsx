import '../heading.scss';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const H2 = (props) => {
  const className = classNames(props.mix, `heading`, `heading--h2`);

  return <h2 className={className}>
    {props.children}
  </h2>;
};

H2.propTypes = {
  mix: PropTypes.string
};

export default React.memo(H2);
