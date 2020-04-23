import './modal.scss';
import './modal-dialog.scss';

import React from 'react';
import IconRunBuild from '@components/Controls/Icons/IconRunBuild/IconRunBuild';

export interface ModalProps {
  children: React.ReactElement;
}

interface ModalState {
  show: boolean;
}

class Modal extends React.PureComponent<ModalProps, ModalState> {
  private readonly modalRef: React.RefObject<HTMLDivElement>;

  constructor(props: ModalProps) {
    super(props);

    this.state = {
      show: false
    };

    this.modalRef = React.createRef();

    this.toggleShow = this.toggleShow.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
  }

  handleKeyUp(evt: KeyboardEvent) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      this.toggleShow();
    }
  }

  toggleShow() {
    this.setState((state) => ({
      show: !state.show
    }));
  }

  handleOutsideClick(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(this.modalRef.current === evt.target) {
      this.toggleShow();
    }
  }

  render() {
    const {
      show
    } = this.state;

    return <React.Fragment>
      <button className="btn btn--small btn--with-icon" type="button" onClick={this.toggleShow}>
        <IconRunBuild mix="btn__icon icon--btn"/>
        <span className="btn__text">Run build</span>
      </button>
      <div className={`modal` + (show ? `` : ` modal--closed`)} ref={this.modalRef} onClick={this.handleOutsideClick}>
        <div className="modal-dialog">
          <h3 className="modal-dialog__heading heading heading--h3">New build</h3>
          <p className="modal-dialog__text">Enter the commit hash which you want to build.</p>
          {React.cloneElement(this.props.children, { handleCancelClick: this.toggleShow })}
        </div>;
      </div>
    </React.Fragment>
  }
}

export default Modal;
