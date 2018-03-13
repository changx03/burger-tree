import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData';
import CheckoutSummary from '../components/Order/CheckoutSummary';

class Checkout extends Component {
  render() {
    console.log('[Checkout]', this.props);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          onCancelClick={() => {
            this.props.history.goBack();
          }}
          onContinueClick={() => {
            this.props.history.replace('/checkout/contact-data');
          }}
        />
        <Route path={this.props.match.url + "/contact-data"} component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

export default connect(mapStateToProps)(Checkout);
