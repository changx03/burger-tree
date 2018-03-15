import React from 'react';
import styleClasses from './Spinner.css';

const spinner = props => (
  <div className={styleClasses.Wrapper}>
    <div className={styleClasses.Loader}>Loading...</div>
  </div>
);

export default spinner;
