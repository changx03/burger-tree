import axios from 'axios';
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
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_API_KEY}`, authData)
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
