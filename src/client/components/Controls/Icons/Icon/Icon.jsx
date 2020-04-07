import './icon.scss';

import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
  const {
    mix,
    width,
    height,
    viewBox = `0 0 ${props.width} ${props.height}`
  } = props;

  return <svg className={`icon ${mix}`.trimEnd()} width={width} height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    {props.children}
  </svg>;
};

Icon.propTypes = {
  mix: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  viewBox: PropTypes.string
}

export default React.memo(Icon);
