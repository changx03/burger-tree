import React, { Component } from 'react';
import axios from '../axios-orders';
import Button from '../components/UI/Button';
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
  };

  componentDidMount() {
    console.log('[ContactData]', this.props);
  }

  render() {
    let form = (
      <form>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={this.state.name}
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={this.state.email}
          onChange={e => {
            this.setState({ email: e.target.value });
          }}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={this.state.address.street}
          onChange={e => {
            const address = { ...this.state.address };
            address.street = e.target.value;
            this.setState({ address: address });
          }}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal code"
          value={this.state.address.postalCode}
          onChange={e => {
            const address = { ...this.state.address };
            address.postalCode = e.target.value;
            this.setState({ address: address });
          }}
        />
        <Button btnType="Success" onClick={this._onFormBtnClick}>
          Order
        </Button>
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
      ingredients: this.props.ingredients,
      price: parseFloat(this.props.price), // <- this should calculated from server
      customer: {
        name: this.state.name,
        address: {
          street: this.state.address.street,
          postCode: this.state.address.postalCode,
        },
        email: this.state.email,
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
  };
}
