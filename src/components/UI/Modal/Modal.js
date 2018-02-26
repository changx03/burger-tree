import React from 'react';
import styleClasses from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

export default class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate() {
    console.log('[Modal] componentWillUpdate');
  }

  render() {
    const { show, children, onDismiss } = this.props;

    return(
      <React.Fragment>
        <div 
          className={styleClasses.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? 1 : 0,
          }}
        >
          {children}
        </div>
        <Backdrop show={show} dismiss={onDismiss}/>
      </React.Fragment>
    );
  }
}
