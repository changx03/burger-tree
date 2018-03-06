import React, { Component } from 'react';
import axios from '../axios-orders';
import Button from '../components/UI/Button/Button';
import Spinner from '../components/UI/Spinner';
import styledClasses from './ContactData.css';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  componentDidMount() {
    console.log('[ContactData]', this.props);
  }

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postalCode" placeholder="Postal code" />
        <Button btnType="Success" onClick={this._onFormBtnClick}>Order</Button>
      </form>
    );
    this.state.loading && (form = <Spinner />);
    return (
      <div className={styledClasses.ContactData}>
        <h4>Enter your contact</h4>
        {form}
      </div>
    );
  }

  _onFormBtnClick = e => {
    e.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.props.price, // <- this should calculated from server
      customer: {
        name: 'Luke',
        address: {
          street: '1 Test street',
          postCode: '1234',
          country: 'New Zealand',
        },
        email: 'luke@test.com',
      },
      deliverMethod: 'fast',
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
        throw err;
      });
  }
}
