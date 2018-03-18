import { actionTypes } from './actionTypes';
import axios from '../../axios-orders';

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId,
  orderData,
});

const purchaseBurgerFailed = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurger = orderData => dispatch => {
  purchaseBurgerStart();
  axios
    .post('/orders.json', orderData)
    .then(response => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch(err => {
      dispatch(purchaseBurgerFailed(err));
    });
};

const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

const fetchOrdersFailed = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrders = () => dispatch => {
  fetchOrdersStart();
  axios
    .get('/orders.json')
    .then(res => {
      const orders = Object.keys(res.data).map(key => ({...res.data[key], id: key}));
      dispatch(fetchOrdersSuccess(orders));
    }).catch(err => {
      dispatch(fetchOrdersFailed(err));
    });
};

