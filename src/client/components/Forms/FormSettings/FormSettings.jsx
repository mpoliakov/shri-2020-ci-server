import '../form.scss';

import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import {AppRoutes} from '@core/const';
import {getError, getLoading, getSettings} from '@reducer/settings/selectors';
import SettingsOperation from '@reducer/settings/operation';
import {ActionCreator} from '@reducer/settings/reducer';

import ControlGroup from '@components/Forms/ControlGroup/ControlGroup';
import ErrorMessage from '@components/Controls/ErrorMessage/ErrorMessage';

class FormSettings extends React.PureComponent {
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
    } = settings;

    return <form className="build-settings__form form" action="/" method="post" onSubmit={handleSubmit}>
      <ControlGroup label="GitHub repository" required={true} name="repoName" defaultValue={repoName}
                    placeholder="user-name/repo-name"/>
      <ControlGroup label="Build command" required={true} name="buildCommand" defaultValue={buildCommand}
                    placeholder="npm i && npm run build"/>
      <ControlGroup label="Main branch" required={false} name="mainBranch" defaultValue={mainBranch}
                    placeholder="master"/>
      <label className="form__control-group form__control-group--sync-time">
        <span className="form__label">Synchronize every</span>
        <input className="form__input" type="number" name="period" defaultValue={period ? period : null}/>
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

FormSettings.propTypes = {
  settings: PropTypes.shape({
    id: PropTypes.string,
    repoName: PropTypes.string,
    buildCommand: PropTypes.string,
    mainBranch: PropTypes.string,
    period: PropTypes.number,
  }),
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  settings: getSettings(state) || {
    repoName: null,
    buildCommand: null,
    mainBranch: null,
    period: 0
  },
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: async (evt) => {
    evt.preventDefault();

    dispatch(ActionCreator.startLoading());

    try {
      await dispatch(SettingsOperation.saveSettings({
        repoName: evt.target.repoName.value,
        buildCommand: evt.target.buildCommand.value,
        mainBranch: evt.target.mainBranch.value,
        period: evt.target.period.value,
      }));

      ownProps.history.push(AppRoutes.HOME);
    } catch {
    }
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormSettings));
