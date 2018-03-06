import React from 'react';
import Logo from '../Logo/Logo';
import NaviItems from '../Navigation/NaviItems';
import styleClasses from './SideDrawer.css';
import Backdrop from '../UI/Backdrop';

const sideDrawer = props => {
  let attachedClasses = [styleClasses.SideDrawer, styleClasses.Close];
  if (props.open) {
    attachedClasses = [styleClasses.SideDrawer, styleClasses.Open];
  }

  return (
    <React.Fragment>
      <Backdrop show={props.open} dismiss={props.dismiss} />
      <div className={attachedClasses.join(' ')}>
        <div className={styleClasses.Logo}>
          <Logo />
        </div>
        <nav>
          <NaviItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
