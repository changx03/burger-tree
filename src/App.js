import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import { actions } from './store';
import asnycComponent from './shared/asyncComponent';
import './App.css';

const asyncAuth = asnycComponent(() => import('./containers/Auth'));
const asyncCheckout = asnycComponent(() => import('./containers/Checkout'));
const asyncOrders = asnycComponent(() => import('./containers/Orders'));
const asyncLogout = asnycComponent(() => import('./containers/Logout'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" exact component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/login" exact component={asyncAuth} />
          <Route path="/logout" exact component={asyncLogout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: !!state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
