// @flow
import { userActions } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  error: null,
  activeUser: {
    username: '',
    timestamp: null,
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.USER_SIGN_OUT:
      return { ...state, ...initialState };

    default:
      return state;
  }
}

export default userReducer;
