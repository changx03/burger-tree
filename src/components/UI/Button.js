import React from 'react';
import styleClasses from './Button.css';

const button = props => (
  <button
    onClick={props.onClick}
    className={[styleClasses.Button, styleClasses[props.btnType]].join(' ')}
  >
    {props.children}
  </button>
);

export default button;
