import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactData from './ContactData';
import CheckoutSummary from '../components/Order/CheckoutSummary';

export default class Checkout extends Component {
  state = { ingredients: {} };

  componentDidMount() {
    console.log('[Checkout]', this.props);

    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = parseInt(param[1], 10);
    }
    this.setState({ ingredients: ingredients });
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
        <Route path={`${this.props.match.path}/contact-data`} component={ContactData}/>
      </div>
    );
  }
}
