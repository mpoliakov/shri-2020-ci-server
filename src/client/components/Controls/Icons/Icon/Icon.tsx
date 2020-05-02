import './icon.scss';

import React from 'react';

export interface IconProps {
  mix?: string;
  width?: number;
  height?: number;
  viewBox?: string;
  children?: React.ReactNode;
}

const Icon: React.FC<IconProps> = (props) => {
  const {
    mix,
    width,
    height,
    viewBox = `0 0 ${props.width} ${props.height}`
  } = props;

  return <svg className={`icon ${mix}`.trim()} width={width} height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    {props.children}
  </svg>;
};

export default React.memo(Icon);
