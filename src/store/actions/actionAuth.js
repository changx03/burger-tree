import { actionTypes } from './actionTypes';

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
};

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
  }
};
