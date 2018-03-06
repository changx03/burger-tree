import React from 'react';
import styledClasses from './Toggle.css';

const toggle = props => (
  <div className={styledClasses.Toggle} onClick={props.onClick}>
    <div />
    <div />
    <div />
  </div>
);

export default toggle;
