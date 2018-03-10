import React from 'react';
import styleClasses from './Order.css';

const order = props => {
  // console.log(props);
  const ingredientsStr = Object.keys(props.ingredients)
    .filter(key => props.ingredients[key] !== 0)
    .map(key => (
      <span
        key={key} 
        style={{ 
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: 5,
          borderRadius: 4,
        }}
      >
        {`${key} (${props.ingredients[key]})`}
      </span>
      )
    );

  return (
    <div className={styleClasses.Order}>
      <p>Ingredients: {ingredientsStr}</p>
      <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
    </div>
  );
}

export default order;
