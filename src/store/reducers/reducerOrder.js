import { actionTypes } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  const updatedProps = {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  };
  return updateObject(state, updatedProps);
};

const fetchOrderSuccess = (state, action) => {
  const updatedProps = {
    orders: action.orders,
    loading: false,
  };
  return updateObject(state, updatedProps);
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};

export default reducer;
