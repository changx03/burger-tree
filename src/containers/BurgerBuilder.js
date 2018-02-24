import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';

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
  };

  render() {
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          onAdd={this._addIngredientHandler}
        />
      </React.Fragment>
    );
  }

  _addIngredientHandler = type => {
    console.log(type);
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] += 1;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    console.log(updatedIngredients);
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
  }

  _removeIngredientHandler = type => {

  }
}
