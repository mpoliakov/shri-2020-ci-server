import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'Comp/Controls/Icons/Icon/Icon';

const IconSuccess = (props) => {
  const {
    mix,
    width = 24,
    height = 24,
  } = props;

  return <Icon mix={`icon--success ${mix}`.trimEnd()} width={width} height={height} viewBox="0 0 24 24">
    <path d="M22.6562 12C22.6562 17.8853 17.8853 22.6562 12 22.6562C6.1147 22.6562 1.34375 17.8853 1.34375 12C1.34375 6.1147 6.1147 1.34375 12 1.34375C17.8853 1.34375 22.6562 6.1147 22.6562 12ZM10.7674 17.6424L18.6736 9.73615C18.9421 9.46768 18.9421 9.03236 18.6736 8.76389L17.7014 7.79164C17.4329 7.52313 16.9976 7.52313 16.7291 7.79164L10.2812 14.2394L7.2709 11.2291C7.00243 10.9606 6.56712 10.9606 6.29861 11.2291L5.32635 12.2014C5.05788 12.4698 5.05788 12.9051 5.32635 13.1736L9.7951 17.6424C10.0636 17.9109 10.4989 17.9109 10.7674 17.6424Z"/>
  </Icon>;
};

IconSuccess.proppTypes = {
  mix: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default React.memo(IconSuccess);
