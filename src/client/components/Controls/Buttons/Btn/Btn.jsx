import "../../../App/common-styles/btn.scss";

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Btn = (props) => {

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
      <Icon/>
      {props.children}
    </React.Fragment>;
  }

  return <button className={className} {...props}>
    {content}
  </button>;
};

Btn.propTypes = {
  size: PropTypes.oneOf([`small`]),
  color: PropTypes.oneOf([`accent`]),
  icon: PropTypes.elementType,
  noText: PropTypes.bool
};

export default Btn;
