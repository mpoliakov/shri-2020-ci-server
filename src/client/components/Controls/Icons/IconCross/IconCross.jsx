import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'Comp/Controls/Icons/Icon/Icon';

const IconCross = (props) => {
  const {
    mix,
    width = 24,
    height = 24,
  } = props;

  return <Icon mix={`icon--reset ${mix}`.trimEnd()} width={width} height={height} viewBox="0 0 24 24">
    <path d="M12 1.34375C6.11328 1.34375 1.34375 6.11328 1.34375 12C1.34375 17.8867 6.11328 22.6562 12 22.6562C17.8867 22.6562 22.6562 17.8867 22.6562 12C22.6562 6.11328 17.8867 1.34375 12 1.34375ZM17.225 14.7973C17.427 14.9992 17.427 15.3258 17.225 15.5277L15.5234 17.225C15.3215 17.427 14.9949 17.427 14.793 17.225L12 14.4062L9.20273 17.225C9.00078 17.427 8.67422 17.427 8.47227 17.225L6.775 15.5234C6.57305 15.3215 6.57305 14.9949 6.775 14.793L9.59375 12L6.775 9.20273C6.57305 9.00078 6.57305 8.67422 6.775 8.47227L8.47656 6.7707C8.67852 6.56875 9.00508 6.56875 9.20703 6.7707L12 9.59375L14.7973 6.775C14.9992 6.57305 15.3258 6.57305 15.5277 6.775L17.2293 8.47656C17.4312 8.67852 17.4312 9.00508 17.2293 9.20703L14.4062 12L17.225 14.7973Z"/>
  </Icon>;
};

IconCross.proppTypes = {
  mix: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default React.memo(IconCross);

