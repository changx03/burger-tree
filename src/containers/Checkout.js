import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData';
import CheckoutSummary from '../components/Order/CheckoutSummary';

class Checkout extends Component {
  render() {
    const summary = this.props.ingredients ? (
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
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
        />
        {this.props.purchased && <Redirect to='/' />}
      </div>
    ) : (
      <Redirect to="/" />
    );

    return summary;
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
