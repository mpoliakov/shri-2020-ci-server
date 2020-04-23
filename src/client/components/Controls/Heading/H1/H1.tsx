import React from 'react';
import Heading, {HeadingProps, HeadingPropsExt, HeadingType} from '../Heading';

const H1: React.FC<HeadingProps> = (props) => {
  const headingProps: HeadingPropsExt = {
    ...props,
    type: HeadingType.h1
  };
  return <Heading {...headingProps}></Heading>;
}

export default React.memo(H1);
