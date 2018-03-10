import React from 'react';
import styleClasses from './Button.css';

const button = props => {
  const { onClick, btnType, children, disabled } = props;
  const btnClasses = [styleClasses.Button, styleClasses[btnType]];
  return (
    <button
      disabled={disabled}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={btnClasses.join(' ')}
    >
      {children}
    </button>
  );
};

export default button;
