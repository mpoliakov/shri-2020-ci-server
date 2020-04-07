import '../form.scss';

import React from 'react';
import PropTypes from 'prop-types';

import IconCross from 'Comp/Controls/Icons/IconCross/IconCross';

class ControlGroup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.handleResetBtnClick = this.handleResetBtnClick.bind(this);
  }

  handleResetBtnClick() {
    this.inputRef.current.value = "";
  }

  render() {
    const {
      required = false,
      label,
      name,
      defaultValue,
      placeholder
    } = this.props;

    return <label className={`form__control-group${required ? ` form__control-group--required` : ``}`}>
      {label && <span className="form__label">{label}</span>}
      <div className="form__input-reset-wrapper">
        <input className="form__input" type="text" name={name} defaultValue={defaultValue} required={required}  placeholder={placeholder} ref={this.inputRef}/>
        <button className="form__btn-reset" type="button" title="Reset" onClick={this.handleResetBtnClick}>
          <IconCross width={16} height={16}/>
        </button>
      </div>
    </label>;
  }
}

ControlGroup.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string
};

export default ControlGroup;
