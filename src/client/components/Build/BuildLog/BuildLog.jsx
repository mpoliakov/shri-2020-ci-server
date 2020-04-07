import './build-log.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Convert from 'ansi-to-html';

const BuildLog = ({log}) => {
  if (!log) {
    return null;
  }

  const converter = new Convert({
    fg: `#000`,
    bg: `#000`,
  });

  const htmlLog = converter.toHtml(log.toString());

  return <pre className="build-log" dangerouslySetInnerHTML={{__html: htmlLog}}></pre>;
};

BuildLog.propTypes = {
  log: PropTypes.string,
};

export default React.memo(BuildLog);
