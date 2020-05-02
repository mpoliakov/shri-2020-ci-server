import './build-log.scss';

import React from 'react';
import Convert from 'ansi-to-html';

export interface BuildLogProps {
  log: BuildLog;
}

const BuildLog: React.FC<BuildLogProps> = ({log}) => {
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

export default React.memo(BuildLog);
