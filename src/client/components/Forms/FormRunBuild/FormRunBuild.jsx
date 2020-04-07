import '../form.scss';

import React from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {AppRoutes} from 'Core/const';
import BuildOperation from 'Reducer/build/operation';
import ControlGroup from 'Comp/Forms/ControlGroup/ControlGroup';

class FormRunBuild extends React.PureComponent {
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (evt) => {
    evt.preventDefault();

    dispatch(BuildOperation.addBuild({
      commitHash: evt.target.commitHash.value,
    }))
      .then((build) => ownProps.history.push(AppRoutes.BUILD + `/` + build.buildNumber));

    ownProps.history.push(AppRoutes.BUILD + `/1368`);
  }
});

export default withRouter(connect(null, mapDispatchToProps)(FormRunBuild));
