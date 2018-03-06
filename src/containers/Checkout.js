import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactData from './ContactData';
import CheckoutSummary from '../components/Order/CheckoutSummary';

export default class Checkout extends Component {
  state = { 
    ingredients: {},
    totalPrice: 0,
  };

  componentDidMount() {
    console.log('[Checkout]', this.props);

    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = parseInt(param[1], 10);
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCancelClick={() => {
            this.props.history.goBack();
          }}
          onContinueClick={() => {
            this.props.history.replace('/checkout/contact-data');
          }}
        />
        <Route 
          path={`${this.props.match.path}/contact-data`}
          render={props => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}
        />
      </div>
    );
  }
}
