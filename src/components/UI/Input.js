import React from 'react';
import styleClasses from './Input.css';

const input = props => {
  let inputElement;
  const { elementType, elementConfig, value, onChange } = props;
  switch (elementType) {
    case 'textarea':
      inputElement = (
        <textarea
          className={styleClasses.InputElement}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={styleClasses.InputElement}
          value={value}
          onChange={onChange}
        >
        {
          elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))
        }
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={styleClasses.InputElement}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
  }

  return (
    <div className={styleClasses.Input}>
      {inputElement}
    </div>
  );
};

export default input;
