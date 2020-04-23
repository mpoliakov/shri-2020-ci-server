import '../form.scss';

import React from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {AppRoutes} from '@core/const';
import BuildOperation from '@reducer/build/operation';
import ControlGroup from '@components/Forms/ControlGroup/ControlGroup';
import {AppDispatch} from '../../../typings';

export interface FormRunBuildProps {
  handleCancelClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSubmit: (evt: any) => void;
}

class FormRunBuild extends React.PureComponent<FormRunBuildProps> {
  render() {
    const {
      handleCancelClick,
      handleSubmit
    } = this.props;

    return <form className="modal-dialog__form form" action="/" method="post" onSubmit={handleSubmit}>
      <ControlGroup required={true} name="commitHash" placeholder="Commit hash"/>
      <div className="form__control-group">
        <button className="btn btn--accent" type="submit">Run build</button>
        <button className="btn" type="button" onClick={handleCancelClick}>Cancel</button>
      </div>
    </form>;
  }
}

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: any) => ({
  handleSubmit: async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      const build = await dispatch(BuildOperation.addBuild(evt.currentTarget.commitHash.value));

      ownProps.history.push(AppRoutes.BUILD + `/` + build.buildNumber);
    } catch {
    }
  }
});

export default withRouter(connect(null, mapDispatchToProps)(FormRunBuild));
