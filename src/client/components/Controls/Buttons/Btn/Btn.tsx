import "../../../App/common-styles/btn.scss";

import React from 'react';
import classNames from 'classnames';

export interface BtnProps {
  size: 'small';
  color: 'accent';
  icon: React.ReactNode,
  noText: boolean,
  children: React.ReactNode
}

const Btn: React.FC<BtnProps> = (props) => {

  const className = classNames({
    'btn': true,
    'btn--small': props.size === `small`,
    'btn--accent': props.color === `accent`,
    'btn--with-icon': props.icon,
    'btn--icon-only': props.noText
  });

  const Icon = props.icon;

  let content;

  if (Icon) {
    content = props.children;
  }
  else {
    content = <React.Fragment>
      {props.children}
    </React.Fragment>;
  }

  return <button className={className} {...props}>
    {content}
  </button>;
};

export default Btn;
