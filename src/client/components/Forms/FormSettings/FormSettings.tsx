import '../form.scss';

import React from 'react';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import {AppRoutes} from '@core/const';
import {getError, getLoading, getSettings} from '@reducer/settings/selectors';
import SettingsOperation from '@reducer/settings/operation';
import {ActionCreator} from '@reducer/settings/reducer';

import ControlGroup from '@components/Forms/ControlGroup/ControlGroup';
import ErrorMessage from '@components/Controls/ErrorMessage/ErrorMessage';
import {AppState} from '@reducer/reducer';
import {AppDispatch} from '../../../typings';

export interface FormSettingsProps {
  settings: SettingsEntity | null;
  loading: boolean;
  error: BuildLog;
  handleSubmit: (evt: any) => void
}

class FormSettings extends React.PureComponent<FormSettingsProps> {
  render() {
    const {
      settings,
      loading,
      error,
      handleSubmit
    } = this.props;

    const {
      repoName,
      buildCommand,
      mainBranch,
      period,
    } = settings || {};

    return <form className="build-settings__form form" action="/" method="post" onSubmit={handleSubmit}>
      <ControlGroup label="GitHub repository" required={true} name="repoName" defaultValue={repoName}
                    placeholder="user-name/repo-name"/>
      <ControlGroup label="Build command" required={true} name="buildCommand" defaultValue={buildCommand}
                    placeholder="npm i && npm run build"/>
      <ControlGroup label="Main branch" required={false} name="mainBranch" defaultValue={mainBranch}
                    placeholder="master"/>
      <label className="form__control-group form__control-group--sync-time">
        <span className="form__label">Synchronize every</span>
        <input className="form__input" type="number" name="period" defaultValue={period}/>
        <span className="form__input-hint">minutes</span>
      </label>
      <div className="form__control-group">
        <button className="btn btn--accent" type="submit" disabled={loading}>Save</button>
        {loading ?
          <a className="btn btn--disabled" href="#">Cancel</a> :
          <Link className="btn" to={AppRoutes.HOME}>Cancel</Link>
        }
      </div>
      {error && <div className="form__control-group">
        <ErrorMessage message={error}/>
      </div>}
    </form>;
  }
}

const mapStateToProps = (state: AppState) => ({
  settings: getSettings(state),
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: any) => ({
  handleSubmit: async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(ActionCreator.startLoading());

    try {
      await dispatch(SettingsOperation.saveSettings({
        repoName: evt.currentTarget.repoName.value,
        buildCommand: evt.currentTarget.buildCommand.value,
        mainBranch: evt.currentTarget.mainBranch.value,
        period: evt.currentTarget.period.value,
      } as SettingsRequest));

      ownProps.history.push(AppRoutes.HOME);
    } catch {
    }
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormSettings));
