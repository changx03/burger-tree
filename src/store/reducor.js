import { actionTypes, BASE_PRICE, INGREDIENT_PRICES } from './constants';

const initState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: BASE_PRICE,
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
