import React from 'react';
import Logo from '../Logo/Logo';
import NaviItems from '../Navigation/NaviItems/NaviItems';
import styleClasses from './SideDrawer.css';

const sideDrawer = props => {
  return (
    <div className={styleClasses.SideDrawer}>
      <div className={styleClasses.Logo}>
        <Logo />
      </div>
      <nav>
        <NaviItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
