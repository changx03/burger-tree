import React from 'react';
import BuildControl from './BuildControl';
import styleClasses from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = props => (
  <div className={styleClasses.BuildControls}>
    <p>Total cost: <strong>${props.totalPrice}</strong></p>
    {controls.map(control => (
      <BuildControl 
        key={control.label}
        label={control.label}
        type={controls.type}
        onAdd={() => props.onAdd(control.type)}
        onRemove={() => props.onRemove(control.type)}
        disabled={props.ingredients[control.type] === 0}
      />
    ))}
    <button 
      className={styleClasses.OrderButton}
      disabled={props.disableOrderBtn}
      onClick={props.onOrderClick}
    >
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
);

export default buildControls;
