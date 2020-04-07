import '../heading.scss';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const H3 = (props) => {
  const className = classNames(props.mix, `heading`, `heading--h3`);

  return <h3 className={className}>
    {props.children}
  </h3>;
};

H3.propTypes = {
  mix: PropTypes.string
};

export default React.memo(H3);
