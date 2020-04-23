import './build-card.scss';

import React from 'react';

import {formatDate, formatDuration} from '@core/utils';

import BuildStatus from '@components/Build/BuildStatus/BuildStatus';
import IconWrapper from '@components/Controls/Icons/IconWrapper/IconWrapper';
import IconCalendar from '@components/Controls/Icons/IconCalendar/IconCalendar';
import IconWatch from '@components/Controls/Icons/IconWatch/IconWatch';
import IconCommit from '@components/Controls/Icons/IconCommit/IconCommit';
import IconUser from '@components/Controls/Icons/IconUser/IconUser';

export interface BuildCardProps {
  build: BuildEntity;
  isCompact?: boolean;
}

const BuildCard: React.FC<BuildCardProps> = (props) => {
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

export default React.memo(BuildCard);
