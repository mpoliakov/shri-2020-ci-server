import '../form.scss';

import React from 'react';

import IconCross from '@components/Controls/Icons/IconCross/IconCross';

export interface ControlGroupProps {
  required: boolean;
  label?: string;
  name: string;
  defaultValue?:  string | number | string[] | undefined;
  placeholder?: string;
}

class ControlGroup extends React.PureComponent<ControlGroupProps> {
  private readonly inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: ControlGroupProps) {
    super(props);

    this.inputRef = React.createRef();

    this.handleResetBtnClick = this.handleResetBtnClick.bind(this);
  }

  handleResetBtnClick() {
    const inputEl = this.inputRef.current;

    if (inputEl) {
      inputEl.value = "";
    }
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
        <input className="form__input" type="text" name={name} defaultValue={defaultValue} required={required}
               placeholder={placeholder} ref={this.inputRef}/>
        <button className="form__btn-reset" type="button" title="Reset" onClick={this.handleResetBtnClick}>
          <IconCross width={16} height={16}/>
        </button>
      </div>
    </label>;
  }
}

export default ControlGroup;
