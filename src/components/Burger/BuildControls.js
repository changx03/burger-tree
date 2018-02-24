import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styleClasses from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = props => (
  <div className={styleClasses.BuildControls}>
    {controls.map(control => (
      <BuildControl 
        key={control.label}
        label={control.label}
        type={controls.type}
        onAdd={() => props.onAdd(control.type)}
      />
    ))}
  </div>
);

export default buildControls;
