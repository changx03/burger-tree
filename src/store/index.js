import burgerBuilder from './reducers/reducerBurgerBuilder';
import order from './reducers/reducerOrder';
import { addIngredient, removeIngredient, initIngredients } from './actions/actionBurgerBuilder';
import { purchaseBurger, purchaseInit, fetchOrders } from './actions/actionOrder';
import { auth } from './actions/actionAuth';
export { BASE_PRICE, INGREDIENT_PRICES, authMethod } from './constants';

export { actionTypes } from './actions/actionTypes';

export const reducer = {
  burgerBuilder,
  order,
};

export const actions = {
  addIngredient,
  initIngredients,
  removeIngredient,
  purchaseBurger,
  purchaseInit,
  fetchOrders,
  auth,
};
