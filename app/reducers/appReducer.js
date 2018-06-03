import { REHYDRATE } from 'redux-persist';

import { userActions, appActions } from '../actions/types';

const initialState = {
  isSignedIn: false,
  selectedDrawer: 0,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      return { ...state, selectedDrawer: initialState.selectedDrawer };
    case userActions.AUTHENTICATE_USER_SUCCESS:
      return { ...state, isSignedIn: true };
    case userActions.USER_SIGN_OUT:
      return { ...state, ...initialState };
    case appActions.SET_DRAWER_TAB:
      return { ...state, selectedDrawer: action.payload };
    default:
      return state;
  }
}

export default appReducer;
