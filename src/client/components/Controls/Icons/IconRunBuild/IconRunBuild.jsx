import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Controls/Icons/Icon/Icon';

const IconRunBuild = (props) => {
  const {
    mix,
    width = 9,
    height = 10,
  } = props;

  return <Icon mix={`icon--run-build ${mix}`.trimEnd()} width={width} height={height} viewBox="0 0 9 10">
    <path d="M8.28873 4.19256L1.41401 0.128275C0.855434 -0.20179 0 0.11851 0 0.934883V9.06151C0 9.7939 0.79489 10.2353 1.41401 9.86811L8.28873 5.80578C8.90198 5.44447 8.90394 4.55388 8.28873 4.19256Z"/>
  </Icon>;
};

IconRunBuild.proppTypes = {
  mix: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default React.memo(IconRunBuild);
