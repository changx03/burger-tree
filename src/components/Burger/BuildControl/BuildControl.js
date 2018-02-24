import React from 'react';
import styleClasses from './BuildControl.css';

const buildControl = props => (
  <div className={styleClasses.BuildControl}>
    <div className={styleClasses.Label}>{props.label}</div>
    <button className={styleClasses.Less}>Less</button>
    <button className={styleClasses.More} onClick={props.onAdd}>More</button>
  </div>
);

export default buildControl;
