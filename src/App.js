import React, { Component } from 'react';
import styledClasses from './App.css';

import Layout from './components/Layout';
import BurgerBuilder from './containers/BurgerBuilder';

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
      </div>
    );
  }
}

export default App;
