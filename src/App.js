import React, { Component } from 'react';
import styledClasses from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styledClasses.app}>
        <p className={styledClasses.main}>Hello world</p>
      </div>
    );
  }
}

export default App;
