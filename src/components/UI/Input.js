import React from 'react';
import styleClasses from './Input.css';

const input = props => {
  const { elementType, elementConfig, value, onChange, isValid, isTouched } = props;
  const inputClasses = [styleClasses.InputElement];
  if (!isValid && isTouched) {
    inputClasses.push(styleClasses.Invalid);
  }
  const className = inputClasses.join(' ');
  let inputElement;
  switch (elementType) {
    case 'textarea':
      inputElement = (
        <textarea
          className={className}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={className}
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
          className={className}
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
