import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styledClasses from './CheckoutSummary.css';

const checkoutSummary = props => {

  return (
    <div className={styledClasses.CheckoutSummary}>
      <h1>Check out summary</h1>
      <div 
        style={{
          width: '100%',
          margin: 'auto',
        }}
      >
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" onClick={props.onCancelClick}>Cancel</Button>
      <Button btnType="Success" onClick={props.onContinueClick}>Continue</Button>
    </div>
  );
}

export default checkoutSummary;
