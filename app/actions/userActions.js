import { userActions } from './types';

export const signIn = (username, password) => {
  return {
    type: userActions.USER_SIGN_IN,
    payload: { username, password },
  };
};

export const signOut = () => {
  return {
    type: userActions.USER_SIGN_OUT,
  };
};

export const handleAuthFailure = (problem) => {
  return {
    type: userActions.AUTHENTICATE_USER_FAIL,
    payload: problem,
  };
};
