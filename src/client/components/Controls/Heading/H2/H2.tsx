import React from 'react';
import Heading, {HeadingProps, HeadingPropsExt, HeadingType} from '../Heading';

const H2: React.FC<HeadingProps> = (props) => {
  const headingProps: HeadingPropsExt = {
    ...props,
    type: HeadingType.h2
  };
  return <Heading {...headingProps}></Heading>;
}

export default React.memo(H2);
