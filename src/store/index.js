import reducerAuth from './reducers/reducerAuth';
import burgerBuilder from './reducers/reducerBurgerBuilder';
import order from './reducers/reducerOrder';
import { addIngredient, removeIngredient, initIngredients } from './actions/actionBurgerBuilder';
import { purchaseBurger, purchaseInit, fetchOrders } from './actions/actionOrder';
import { auth, logout } from './actions/actionAuth';
export { BASE_PRICE, INGREDIENT_PRICES, authMethod } from './constants';

export { actionTypes } from './actions/actionTypes';

export const reducer = {
  auth: reducerAuth,
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
  logout,
};
