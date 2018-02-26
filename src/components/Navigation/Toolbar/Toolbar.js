import React from 'react';
import styleClasses from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NaviItems from '../NaviItems/NaviItems';
import MenuToggle from '../../SideDrawer/Toggle/Toggle';

const toolbar = props => (
  <header className={styleClasses.Toolbar}>
    <MenuToggle onClick={props.onClick} />
    <div className={styleClasses.Logo}>
      <Logo />
    </div>
    <nav className={styleClasses.DesktopOnly}>
      <NaviItems />
    </nav>
  </header>
);

export default toolbar;
