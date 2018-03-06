import React from 'react';
import Button from '../UI/Button';

// This could be a stateless function
export default class OrderSummary extends React.Component {
  componentWillUpdate() {
    console.log('[OrderSummary] componentWillUpdate');
  }

  render() {
    const { totalPrice, onCancel, onContinue, ingredients } = this.props;
    const summary = Object.keys(ingredients).map(key => (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>
        {' ' + ingredients[key]}
      </li>
    ));

    return (
      <React.Fragment>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{summary}</ul>
        <p>
          Total price: <strong>${totalPrice}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" onClick={onCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" onClick={onContinue}>
          CONTINUE
        </Button>
      </React.Fragment>
    );
  }
}
