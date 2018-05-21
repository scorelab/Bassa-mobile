import { userActions } from './types';

export const signIn = (username, password) => ({
  type: userActions.USER_SIGN_IN,
  payload: { user_name: username, password },
});

export const signUp = (username, email, password, confirmPassword) => ({
  type: userActions.USER_SIGN_UP,
  payload: {
    user_name: username, email, password, confirm_password: confirmPassword,
  },
});

export const signOut = () => ({
  type: userActions.USER_SIGN_OUT,
});

export const handleAuthFailure = problem => ({
  type: userActions.AUTHENTICATE_USER_FAIL,
  payload: problem,
});

export const handleAuthSuccess = userData => ({
  type: userActions.AUTHENTICATE_USER_SUCCESS,
  payload: userData,
});

export const handleSignUpFailure = problem => ({
  type: userActions.SIGN_UP_USER_FAIL,
  payload: problem,
});

export const handleSignUpSuccess = userData => ({
  type: userActions.SIGN_UP_USER_SUCCESS,
  payload: userData,
});
