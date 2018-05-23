import { put, call, takeEvery, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import UserService from '../services/userService';
import { userActions } from '../actions/types';
import { resetToSignIn, resetToMainDrawer } from '../actions/appActions';
import { setTokenToHeader } from '../actions/tokenActions';
import { handleAuthFailure, handleAuthSuccess, handleSignUpFailure, handleSignUpSuccess } from '../actions/userActions';

function* signInUser({ payload }) {
  try {
    const response = yield call(UserService.signIn, payload);
    if (response.status === 200) {
      yield put(handleAuthSuccess({
        username: payload.user_name,
        isAdmin: Number(response.data.auth) === 0 ? true : false,
      }));
      yield put(setTokenToHeader(response.headers.token));
      yield put(resetToMainDrawer());
    } else if (response.status === 401) {
      Alert.alert('Error', 'Account is not approved yet');
      yield put(handleAuthFailure(response.problem));
      yield put(resetToSignIn());
    } else {
      Alert.alert('Error', 'Authentication failed!');
      yield put(handleAuthFailure(response.problem));
      yield put(resetToSignIn());
    }
  } catch (error) {
    Alert.alert('Error', 'Authentication failed!');
    yield put(handleAuthFailure(error));
    yield put(resetToSignIn());
  }
}

function* signUpUser({ payload }) {
  try {
    const response = yield call(UserService.signUp, payload);
    if (response.status === 200) {
      yield put(handleSignUpSuccess(response.data));
      Alert.alert('Success', 'Please note that your account needs to be approved by an Admin before you Sign-In');
      yield put(resetToSignIn());
    } else {
      Alert.alert('Error', 'Sign-Up failed!');
      yield put(handleSignUpFailure(response.problem));
      yield put(resetToSignIn());
    }
  } catch (error) {
    Alert.alert('Error', 'Sign-Up failed!');
    yield put(handleSignUpFailure(error));
    yield put(resetToSignIn());
  }
}

export default function* userSaga() {
  yield all([
    takeEvery(userActions.USER_SIGN_IN, signInUser),
    takeEvery(userActions.USER_SIGN_UP, signUpUser),
  ]);
}
