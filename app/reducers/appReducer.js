import { userActions } from '../actions/types';

const initialState = {
  isSignedIn: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.AUTHENTICATE_USER_SUCCESS:
      return { ...state, isSignedIn: true };
    case userActions.USER_SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
}

export default appReducer;
