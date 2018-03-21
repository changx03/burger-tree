import axios from 'axios';
import { actionTypes } from './actionTypes';
import { authMethod } from '../constants';

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
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.error(err);
        dispatch(authFail(err));
      });
  }
};
