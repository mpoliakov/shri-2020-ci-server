import './heading.scss';

import React from 'react';
import classNames from 'classnames';

export enum HeadingType {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3'
}

export interface HeadingProps {
  mix: string;
  children: React.ReactNode;
}

export interface HeadingPropsExt extends HeadingProps {
  type: HeadingType;
}

const Heading: React.FC<HeadingPropsExt> = (props) => {
  let className: string;

  switch (props.type) {
    case HeadingType.h1:
      className = classNames(props.mix, `heading`, `heading--h1`);

      return <h1 className={className}>
        {props.children}
      </h1>;
    case HeadingType.h2:
      className = classNames(props.mix, `heading`, `heading--h2`);

      return <h2 className={className}>
        {props.children}
      </h2>;
    case HeadingType.h3:
      className = classNames(props.mix, `heading`, `heading--h3`);

      return <h3 className={className}>
        {props.children}
      </h3>;
  }

  return null;
}

export default React.memo(Heading);
