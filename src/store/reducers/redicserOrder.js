import { actionTypes } from '../actions/actionTypes';

const initState = {
  orders: [],
  loading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {


        
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {};
    default:
      return state;
  }
};

export default reducer;
