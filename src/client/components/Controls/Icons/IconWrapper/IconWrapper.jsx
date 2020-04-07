import './icon-wrapper.scss';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconWrapper = (props) => {
  const className = classNames(props.mix, `icon-wrapper`);

  return <div className={className}>
    {props.children}
  </div>
};

IconWrapper.propTypes = {
  mix: PropTypes.string
};

export default IconWrapper;
