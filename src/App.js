import React, { Component } from 'react';
import styledClasses from './App.css';

import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import Layout from './components/Layout';

class App extends Component {
  state = {
    show: true,
  };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false });
  //   }, 5000);
  // }

  render() {
    return (
      <div className={styledClasses.app}>
        <Layout>
        {this.state.show && <BurgerBuilder />}
        </Layout>
        <Checkout />
      </div>
    );
  }
}

export default App;
