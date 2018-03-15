import { actionTypes } from '../actions/actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient,
});

export const removeIngredient = ingredient => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient,
});

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => dispatch => {
  axios
    .get('/ingredients.json')
    .then(res => {
      dispatch(setIngredients(res.data));
    })
    .catch(err => {
      dispatch(fetchIngredientsFailed());
    });
};
