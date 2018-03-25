import { actionTypes } from '../actions/actionTypes';
import { updateObject } from './utility';

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        error: null,
        loading: false,
        userId: action.userId,
        token: action.token,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        userId: null,
        token: null,
      });
    default:
      return { ...state };
  }
};

export default reducer;