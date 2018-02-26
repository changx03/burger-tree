import React from 'react';
import styleClasses from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NaviItems from '../NaviItems/NaviItems';

const toolbar = props => (
  <header className={styleClasses.Toolbar}>
    <div>MENU</div>
    <div className={styleClasses.Logo}>
      <Logo />
    </div>
    <nav>
      <NaviItems />
    </nav>
  </header>
);

export default toolbar;
