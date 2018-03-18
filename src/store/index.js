import burgerBuilder from './reducers/reducerBurgerBuilder';
import { addIngredient, removeIngredient, initIngredients } from './actions/actionBurgerBuilder';
import { purchaseBurger } from './actions/actionOrder';

export { actionTypes } from './actions/actionTypes';

export const reducer = {
  burgerBuilder,
};

export const actions = {
  addIngredient,
  initIngredients,
  removeIngredient,
  purchaseBurger,
};
