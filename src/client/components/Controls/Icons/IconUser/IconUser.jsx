import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'Comp/Controls/Icons/Icon/Icon';

const IconUser = (props) => {
  const {
    mix,
    width = 13,
    height = 14,
  } = props;

  return <Icon mix={`icon--user ${mix}`.trimEnd()} width={width} height={height} viewBox="0 0 13 14">
    <path d="M6.125 7C8.0582 7 9.625 5.4332 9.625 3.5C9.625 1.5668 8.0582 0 6.125 0C4.1918 0 2.625 1.5668 2.625 3.5C2.625 5.4332 4.1918 7 6.125 7ZM8.575 7.875H8.11836C7.51133 8.15391 6.83594 8.3125 6.125 8.3125C5.41406 8.3125 4.74141 8.15391 4.13164 7.875H3.675C1.64609 7.875 0 9.52109 0 11.55V12.6875C0 13.4121 0.587891 14 1.3125 14H10.9375C11.6621 14 12.25 13.4121 12.25 12.6875V11.55C12.25 9.52109 10.6039 7.875 8.575 7.875Z"/>
  </Icon>;
};

IconUser.proppTypes = {
  mix: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default React.memo(IconUser);