import React from 'react';
import styleClasses from './Input.css';

const input = props => {
  let inputElement;

  switch (props.inputType) {
    case 'textarea':
      inputElement = <textarea {...props} />;
      break;
    default:
      inputElement = <input {...props} />;
  }

  return (
    <div className={styleClasses.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
