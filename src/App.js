import React, { Component } from 'react';
import styledClasses from './App.css';

import Layout from './components/Layout';
import BurgerBuilder from './containers/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div className={styledClasses.app}>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
