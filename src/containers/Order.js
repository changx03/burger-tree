import React from 'react';
import styleClasses from './Orders.css';

const order = props => (
  <div className={styleClasses.Order}>
    <p>Ingredients: Salad</p>
    <p>Price: <strong>6</strong></p>
  </div>
);

export default order;
