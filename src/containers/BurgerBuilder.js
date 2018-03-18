import React, { Component } from 'react';
import { connect } from 'react-redux';
import BuildControls from '../components/Burger/BuildControls';
import Burger from '../components/Burger/Burger';
import Modal from '../components/UI/Modal';
import OrderSummary from '../components/Burger/OrderSummary';
import Spinner from '../components/UI/Spinner';
import errorHandler from './errorHandler';
import { actions } from '../store';
import axios from '../axios-orders';

class BurgerBuilder extends Component {
  state = {
    showPurchaseModal: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  // When Modal shouldComponentUpdate returns false, it will stop all children from rerendering.
  // Returning false does not prevent child components from re-rendering when their state changes
  render() {
    let orderSummary;
    let burger = this.props.error ? <p>{this.props.error}</p> : <Spinner />;

    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          onCancel={this._onDismissPurchaseModal}
          onContinue={this._onContinuePurchase}
          totalPrice={this.props.totalPrice.toFixed(2)}
        />
      );
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            onAdd={this.props.onIngAdded}
            onRemove={this.props.onIngRemoved}
            ingredients={this.props.ingredients}
            totalPrice={this.props.totalPrice.toFixed(2)}
            disableOrderBtn={this.props.totalPrice <= 4}
            onOrderClick={this._orderHandler}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.showPurchaseModal}
          onDismiss={this._onDismissPurchaseModal}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }

  _orderHandler = () => {
    this.setState({
      showPurchaseModal: true,
    });
  };

  _onDismissPurchaseModal = () => {
    this.setState({
      showPurchaseModal: false,
    });
  };

  _onContinuePurchase = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
});

const mapDispatchToProps = dispatch => ({
  onIngAdded: ingredient => dispatch(actions.addIngredient(ingredient)),
  onIngRemoved: ingredient => dispatch(actions.removeIngredient(ingredient)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  errorHandler(BurgerBuilder, axios)
);
