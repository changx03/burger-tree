import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styledClasses from './App.css';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import Layout from './components/Layout';
import Orders from './containers/Orders';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={styledClasses.app}>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
