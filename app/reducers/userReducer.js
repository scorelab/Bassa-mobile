// @flow
import { userActions } from '../actions/types';

const initialState = {
  currentUser: {
    username: '',
    isAdmin: false,
    timestamp: null,
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.USER_SIGN_OUT:
      return { ...state, ...initialState };
    case userActions.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          username: action.payload.username,
          isAdmin: action.payload.isAdmin,
          timestamp: Date.now(),
        },
      };
    default:
      return state;
  }
}

export default userReducer;
