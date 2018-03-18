import { BASE_PRICE, INGREDIENT_PRICES } from '../constants';
import { actionTypes } from '../actions/actionTypes';
import { updateObject } from './utility';

const initState = {
  ingredients: null,
  totalPrice: BASE_PRICE,
  error: false,
};

const computeInitialPrice = ingredients => {
  return Object.keys(ingredients).reduce(
    (acc, cur) => acc + INGREDIENT_PRICES[cur] * ingredients[cur],
    BASE_PRICE
  );
};

const updateIngredient = (state, action, type = 'add') => {
  const ingredient = {
    [action.ingredient]:
      state.ingredients[action.ingredient] + (type === 'add' ? 1 : -1),
  };
  const totalPrice =
    state.totalPrice +
    (type === 'add'
      ? INGREDIENT_PRICES[action.ingredient]
      : -INGREDIENT_PRICES[action.ingredient]);
  const updatedIngredients = updateObject(state.ingredients, ingredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice,
  };
  return updateObject(state, updatedState);
};

const setIngredient = (state, action) => {
  const totalPrice = computeInitialPrice(action.ingredients);
  const updatedState = {
    ingredients: action.ingredients,
    totalPrice,
    error: false,
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return updateIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingredient] > 0) {
        return updateIngredient(state, action, 'remove');
      } else {
        return state;
      }
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
