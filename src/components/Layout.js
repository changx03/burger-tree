import React from 'react';
import styledClasses from './Layout.css';

const layout = props => {
  return (
    <React.Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={styledClasses.Content}>
        {props.children}
      </main>
    </React.Fragment>
  );
}

export default layout;
