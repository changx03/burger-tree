import React from 'react';
import styledClasses from './Layout.css';
import Toolbar from './Navigation/Toolbar/Toolbar';

const layout = props => {
  // TODO: SideDrawer
  return (
    <React.Fragment>
      <Toolbar />
      <main className={styledClasses.Content}>
        {props.children}
      </main>
    </React.Fragment>
  );
}

export default layout;
