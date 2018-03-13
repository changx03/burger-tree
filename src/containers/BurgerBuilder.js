import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import BuildControls from '../components/Burger/BuildControls';
import Burger from '../components/Burger/Burger';
import Modal from '../components/UI/Modal';
import OrderSummary from '../components/Burger/OrderSummary';
import Spinner from '../components/UI/Spinner';
import errorHandler from './errorHandler';
import { actionTypes } from '../store/constants';

class BurgerBuilder extends Component {
  state = {
    showPurchaseModal: false,
    loading: false,
    error: null,
  };

  // async componentDidMount() {
  //   // console.log('[BurgerBuilder]', this.props);

  //   await axios
  //     .get('/ingredients.json')
  //     .then(res => {
  //       this.setState({
  //         ingredients: res.data,
  //       });
  //     })
  //     .catch(err => {
  //       this.setState({
  //         error: err.message,
  //       });
  //     });
  //   this._computeInitialPrice();
  // }

  // When Modal shouldComponentUpdate returns false, it will stop all children from rerendering.
  // Returning false does not prevent child components from re-rendering when their state changes
  render() {
    let orderSummary;
    let burger = this.state.error ? <p>{this.state.error}</p> : <Spinner />;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
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

  // _computeInitialPrice = () => {
  //   if (this.props.ingredients) {
  //     const price = Object.keys(this.props.ingredients).reduce(
  //       (acc, cur) =>
  //         acc + INGREDIENT_PRICES[cur] * this.props.ingredients[cur],
  //       BASE_PRICE
  //     );
  //     // console.log('[BurgerBuilder]:_computeInitialPrice:price:', price);
  //     this.setState({ totalPrice: price });
  //   }
  // };

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
    Object.keys(this.props.ingredients).forEach(ingKey => {
      queryStr.push(
        `${encodeURIComponent(ingKey)}=${encodeURIComponent(
          this.props.ingredients[ingKey]
        )}`
      );
      queryStr.push(`price=${encodeURIComponent(this.props.totalPrice)}`);
    });
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryStr.join('&')}`,
    });
  };
}

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

const mapDispatchToProps = dispatch => ({
  onIngAdded: ingredient => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredient }),
  onIngRemoved: ingredient => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredient }),
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
