import React, { Component } from 'react';
import axios from '../axios-orders';
import BuildControls from '../components/Burger/BuildControls';
import Burger from '../components/Burger/Burger';
import Modal from '../components/UI/Modal';
import OrderSummary from '../components/Burger/OrderSummary';
import Spinner from '../components/UI/Spinner';
import errorHandler from './errorHandler';

const INGREDIENT_PRICES = {
  salad: 0.7,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

const BASE_PRICE = 4;

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: BASE_PRICE,
    showPurchaseModal: false,
    loading: false,
    error: null,
  };

  async componentDidMount() {
    console.log('[BurgerBuilder]', this.props);

    await axios
      .get('/ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data,
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
    this._computeInitialPrice();
  }

  // When Modal shouldComponentUpdate returns false, it will stop all children from rerendering.
  // Returning false does not prevent child components from re-rendering when their state changes
  render() {
    let orderSummary;
    let burger = this.state.error ? <p>{this.state.error}</p> : <Spinner />;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          onCancel={this._onDismissPurchaseModal}
          onContinue={this._onContinuePurchase}
          totalPrice={this.state.totalPrice.toFixed(2)}
        />
      );
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            onAdd={this._addIngredientHandler}
            onRemove={this._removeIngredientHandler}
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice.toFixed(2)}
            disableOrderBtn={this.state.totalPrice <= 4}
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

  _computeInitialPrice = () => {
    if (this.state.ingredients) {
      const price = Object.keys(this.state.ingredients).reduce(
        (acc, cur) => acc + INGREDIENT_PRICES[cur] * this.state.ingredients[cur],
        BASE_PRICE
      );
      console.log('[BurgerBuilder]:_computeInitialPrice:price:', price);
      this.setState({ totalPrice: price });
    }
  };

  _addIngredientHandler = type => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type]++;
    const updatedPrice = Math.round((this.state.totalPrice + INGREDIENT_PRICES[type]) * 100) / 100;
    console.log('[BurgerBuilder]:_addIngredientHandler:updatedPrice:', updatedPrice);
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
  };

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
  };

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
    const queryStr = [];
    Object.keys(this.state.ingredients).forEach(ingKey => {
      queryStr.push(`${encodeURIComponent(ingKey)}=${encodeURIComponent(this.state.ingredients[ingKey])}`);
      queryStr.push(`price=${encodeURIComponent(this.state.totalPrice)}`);
    });
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryStr.join('&')}`,
    });
  };
}

export default errorHandler(BurgerBuilder, axios);
