import './build-status.scss';

import React from 'react';
import PropTypes from 'prop-types';

import IconSuccess from 'Comp/Controls/Icons/IconSuccess/IconSuccess';
import IconCross from 'Comp/Controls/Icons/IconCross/IconCross';
import IconWaiting from 'Comp/Controls/Icons/IconWaiting/IconWaiting';

const BuildStatus = ({mix, status}) => {
  const className = `build-status build-status--${status.toLowerCase()} ${mix}`.trimEnd();

  switch (status) {
    case `Success`:
      return <IconSuccess mix={className}/>;
    case `Fail`:
    case `Canceled`:
      return <IconCross mix={className}/>;
    case `Waiting`:
    case `InProgress`:
      return <IconWaiting mix={className}/>;
    default:
      return null;
  }
};

BuildStatus.propTypes = {
  mix: PropTypes.string,
  status: PropTypes.oneOf([`Waiting`, `InProgress`, `Success`, `Fail`, `Canceled`])
};

export default React.memo(BuildStatus);
