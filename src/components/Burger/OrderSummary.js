import React from 'react';
import Button from '../UI/Button/Button';

const orderSummary = props => {
  const summary = Object.keys(props.ingredients)
    .map(key => (
      <li key={key}>
        <span style={{ textTransform: 'capitalize'}}>{key}</span>
        {' ' + props.ingredients[key]}
      </li>
      ));

  return (
    <React.Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {summary}
      </ul>
      <p>Total price: <strong>${props.totalPrice}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" onClick={props.onCancel}>CANCEL</Button>
      <Button btnType="Success" onClick={props.onContinue}>CONTINUE</Button>
    </React.Fragment>
  );
};

export default orderSummary;
