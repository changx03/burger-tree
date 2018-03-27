import React from 'react';
import { connect } from 'react-redux';
import styledClasses from './Layout.css';
import Toolbar from './Navigation/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';

export class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <Toolbar 
          isAuth={this.props.isAuth}
          onClick={this._menuToggleClick} 
        />
        <SideDrawer
          isAuth={this.props.isAuth}
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

const mapStateToProps = state => ({
  isAuth: !!state.auth.token,
});

export default connect(mapStateToProps)(Layout);
