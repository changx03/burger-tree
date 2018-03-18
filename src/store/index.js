import burgerBuilder from './reducers/reducerBurgerBuilder';
import order from './reducers/reducerOrder';
import { addIngredient, removeIngredient, initIngredients } from './actions/actionBurgerBuilder';
import { purchaseBurger, purchaseInit, fetchOrders } from './actions/actionOrder';

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
};
