import React from 'react';
import styleClasses from './Modal.css';
import Backdrop from './Backdrop';

export default class Modal extends React.Component {
  // Don't forget check children (shallow)
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
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
