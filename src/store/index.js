import burgerBuilder from './reducers/reducerBurgerBuilder';
import { addIngredient, removeIngredient, initIngredients } from './actions/actionBurgerBuilder';
import { purchaseBurgerStart } from './actions/actionOrder';

export { actionTypes } from './actions/actionTypes';

export const reducer = {
  burgerBuilder,
};

export const actions = {
  addIngredient,
  initIngredients,
  removeIngredient,
  purchaseBurgerStart,
};
