import '../form.scss';

import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import {AppRoutes} from 'Core/const';
import {getSettings} from 'Reducer/settings/selectors';
import SettingsOperation from 'Reducer/settings/operation';
import ControlGroup from 'Comp/Forms/ControlGroup/ControlGroup';

class FormSettings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.submitBtnRef = React.createRef();
    this.cancelBtnRef = React.createRef();

    this.handleSubmitExt = this.handleSubmitExt.bind(this);
  }

  handleSubmitExt(evt) {
    const {
      handleSubmit
    } = this.props;

    this.submitBtnRef.current.disabled = true;
    this.cancelBtnRef.current.remove();

    handleSubmit(evt);
  }

  render() {
    const {
      settings,
    } = this.props;

    const {
      repoName,
      buildCommand,
      mainBranch,
      period,
    } = settings;

    return <form className="build-settings__form form" action="/" method="post" onSubmit={this.handleSubmitExt}>
      <ControlGroup label="GitHub repository" required={true} name="repoName" defaultValue={repoName} placeholder="user-name/repo-name"/>
      <ControlGroup label="Build command" required={true} name="buildCommand" defaultValue={buildCommand} placeholder="npm i && npm run build"/>
      <ControlGroup label="Main branch" required={false} name="mainBranch" defaultValue={mainBranch} placeholder="master"/>
      <label className="form__control-group form__control-group--sync-time">
        <span className="form__label">Synchronize every</span>
        <input className="form__input" type="number" name="period" defaultValue={period ? period : null}/>
        <span className="form__input-hint">minutes</span>
      </label>
      <div className="form__control-group">
        <button className="btn btn--accent" type="submit" ref={this.submitBtnRef}>Save</button>
        <Link className="btn" to={AppRoutes.HOME} ref={this.cancelBtnRef}>Cancel</Link>
      </div>
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
  }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (evt) => {
    evt.preventDefault();

    dispatch(SettingsOperation.saveSettings({
      repoName: evt.target.repoName.value,
      buildCommand: evt.target.buildCommand.value,
      mainBranch: evt.target.mainBranch.value,
      period: evt.target.period.value,
    }))
      .then(() => ownProps.history.push(AppRoutes.HOME));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormSettings));
