import React from 'react';
import styledClasses from './Layout.css';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';

const layout = props => {
  // TODO: SideDrawer
  return (
    <React.Fragment>
      <Toolbar />
      <SideDrawer />
      <main className={styledClasses.Content}>
        {props.children}
      </main>
    </React.Fragment>
  );
}

export default layout;
