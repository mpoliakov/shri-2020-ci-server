import './build-status.scss';

import React from 'react';

import IconSuccess from '@components/Controls/Icons/IconSuccess/IconSuccess';
import IconCross from '@components/Controls/Icons/IconCross/IconCross';
import IconWaiting from '@components/Controls/Icons/IconWaiting/IconWaiting';

export interface BuildStatusProps {
  mix: string;
  status: BuildStatus
}

const BuildStatus: React.FC<BuildStatusProps> = ({mix, status}) => {
  const className = `build-status build-status--${status.toLowerCase()} ${mix}`.trim();

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

export default React.memo(BuildStatus);
