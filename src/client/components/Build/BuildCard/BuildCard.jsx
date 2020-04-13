import './build-card.scss';

import React from 'react';
import PropTypes from 'prop-types';

import {formatDate, formatDuration} from '@core/utils';

import BuildStatus from '@components/Build/BuildStatus/BuildStatus';
import IconWrapper from '@components/Controls/Icons/IconWrapper/IconWrapper';
import IconCalendar from '@components/Controls/Icons/IconCalendar/IconCalendar';
import IconWatch from '@components/Controls/Icons/IconWatch/IconWatch';
import IconCommit from '@components/Controls/Icons/IconCommit/IconCommit';
import IconUser from '@components/Controls/Icons/IconUser/IconUser';

const BuildCard = (props) => {
  const {
    build,
    isCompact = false
  } = props;

  if (!build) {
    return null;
  }

  return <section className={`build-card ` + (isCompact ? `build-card--compact ` : ``) + `build-card--status--${build.status.toLowerCase()}`}>
    <div className="build-card__main">
      <BuildStatus mix="build-card__status" status={build.status}/>
      <h3 className="build-card__issue heading">
        <span className="build-card__issue-number">#{build.buildNumber}</span>&nbsp;
        <span className="build-card__issue-comment">{build.commitMessage}</span>
      </h3>
      <IconWrapper mix="build-card__commit">
        <IconCommit/>
        <span className="build-card__commit-branch">{build.branchName}</span>&nbsp;
        <span className="build-card__commit-hash">{build.commitHash}</span>
      </IconWrapper>
      <IconWrapper mix="build-card__author">
        <IconUser/>
        {build.authorName}
      </IconWrapper>
    </div>
    <div className="build-card__time">
      {build.start && <IconWrapper mix="build-card__time-start">
        <IconCalendar/>
        {formatDate(build.start)}
      </IconWrapper>}
      {build.duration && <IconWrapper mix="build-card__time-duration">
        <IconWatch/>
        {formatDuration(build.duration)}
      </IconWrapper>}
    </div>
  </section>;
};

BuildCard.propTypes = {
  build: PropTypes.shape({
    id: PropTypes.string.isRequired,
    configurationId: PropTypes.string.isRequired,
    buildNumber: PropTypes.number.isRequired,
    commitMessage: PropTypes.string.isRequired,
    commitHash: PropTypes.string.isRequired,
    branchName: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    status: PropTypes.oneOf([`Waiting`, `InProgress`, `Success`, `Fail`, `Canceled`]),
    start: PropTypes.string,
    duration: PropTypes.number
  }),
  isCompact: PropTypes.bool
};

export default React.memo(BuildCard);
