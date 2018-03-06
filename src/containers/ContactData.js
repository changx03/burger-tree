import React, { Component } from 'react';
import Button from '../components/UI/Button/Button';
import styledClasses from './ContactData.css';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    }
  }

  render() {
    return (
      <div className={styledClasses.ContactData}>
        <h4>Enter your contact</h4>
        <form>
          <input type="text" name="name" placeholder="Your name" />
          <input type="email" name="email" placeholder="Your email" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postalCode" placeholder="Postal code" />
          <Button btnType="Success">Order</Button>
        </form>
      </div>
    );
  }
}
