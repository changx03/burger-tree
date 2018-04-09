import reducer, { initState } from './reducerAuth';
import { actionTypes } from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should store token after logged in', () => {
    expect(
      reducer(
        { ...initState },
        {
          type: actionTypes.AUTH_SUCCESS,
          userId: 'userId',
          token: 'token',
        }
      )
    ).toEqual({
      ...initState,
      userId: 'userId',
      token: 'token',
    });
  });
});
