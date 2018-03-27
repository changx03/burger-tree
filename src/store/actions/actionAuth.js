import axios from 'axios';
import { actionTypes } from './actionTypes';
import { authMethod } from '../constants';

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId,
  };
};

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

const checkAuthTimeout = expiresTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresTime * 1000);
  };
};

export const auth = (email, password, method) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    const url = method === authMethod.SIGNUP ?
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_API_KEY}`
      : `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_API_KEY}`;

    axios.post(url, authData)
      .then(response => {
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.error(err);
        dispatch(authFail(err.response.data.error));
      });
  }
};

export const setAuthRedirect = path => ({
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path,
});
