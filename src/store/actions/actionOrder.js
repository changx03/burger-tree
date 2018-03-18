import { actionTypes } from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId,
  orderData,
});

const purchaseBurgerFailed = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = orderData => dispatch => {
  purchaseBurgerStart();
  axios
    .post('/orders.json', orderData)
    .then(response => {
      console.log(response.data);
      dispatch(purchaseBurgerSuccess(response.data, orderData));
    })
    .catch(err => {
      dispatch(purchaseBurgerFailed(err));
    });
};
