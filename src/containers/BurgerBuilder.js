import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.7,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4, // base price
    showPurchaseModal: false,
  };

  // When Modal shouldComponentUpdate returns false, it will stop all children from rerendering.
  // Returning false does not prevent child components from re-rendering when their state changes
  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.showPurchaseModal} onDismiss={this._onDismissPurchaseModal}>
          <OrderSummary 
            ingredients={this.state.ingredients} 
            onCancel={this._onDismissPurchaseModal}
            onContinue={this._onContinuePurchase}
            totalPrice={this.state.totalPrice.toFixed(2)}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          onAdd={this._addIngredientHandler}
          onRemove={this._removeIngredientHandler}
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice.toFixed(2)}
          disableOrderBtn={this.state.totalPrice === 4}
          onOrderClick={this._orderHandler}
        />
      </React.Fragment>
    );
  }

  _addIngredientHandler = type => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type]++;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    // console.log(updatedIngredients);
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
  }

  _removeIngredientHandler = type => {
    const updatedIngredients = { ...this.state.ingredients };
    let updatedPrice = this.state.totalPrice;
    if (updatedIngredients[type] > 0) {
      updatedIngredients[type]--;
      updatedPrice -= INGREDIENT_PRICES[type];
    }
    // console.log(updatedIngredients);
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
  }

  _orderHandler = () => {
    this.setState({
      showPurchaseModal: true,
    });
  }

  _onDismissPurchaseModal = () => {
    this.setState({
      showPurchaseModal: false,
    });
  }

  _onContinuePurchase = () => {
    alert('_onContinuePurchase');
  }
}
