import { BASE_PRICE, INGREDIENT_PRICES } from '../constants';
import { actionTypes } from '../actions/actionTypes';

const initState = {
  ingredients: null,
  totalPrice: BASE_PRICE,
  error: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingredient] > 0) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] - 1,
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default reducer;
