import React from 'react';
import styledClasses from './Layout.css';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';

export default class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <Toolbar onClick={this._menuToggleClick} />
        <SideDrawer
          open={this.state.showSideDrawer}
          dismiss={this._sideDrawerClosedHandler}
        />
        <main className={styledClasses.Content}>{children}</main>
      </React.Fragment>
    );
  }

  _sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  _menuToggleClick = () => {
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  };
}
