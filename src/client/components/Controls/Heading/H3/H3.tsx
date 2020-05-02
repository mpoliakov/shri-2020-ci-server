import React from 'react';
import Heading, {HeadingProps, HeadingPropsExt, HeadingType} from '../Heading';

const H3: React.FC<HeadingProps> = (props) => {
  const headingProps: HeadingPropsExt = {
    ...props,
    type: HeadingType.h3
  };
  return <Heading {...headingProps}></Heading>;
}

export default React.memo(H3);
