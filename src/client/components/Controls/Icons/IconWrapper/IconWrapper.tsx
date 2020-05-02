import './icon-wrapper.scss';

import React from 'react';
import classNames from 'classnames';

export interface IconWrapperProps {
  mix?: string;
  children?: React.ReactNode;
}

const IconWrapper: React.FC<IconWrapperProps> = (props) => {
  const className = classNames(props.mix, `icon-wrapper`);

  return <div className={className}>
    {props.children}
  </div>
};

export default IconWrapper;
