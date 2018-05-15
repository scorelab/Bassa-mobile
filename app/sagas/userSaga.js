import { put, call, takeEvery, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import UserService from '../services/userService';
import { userActions } from '../actions/types';
import { resetToSignIn, resetToMainDrawer } from '../actions/initActions';
import { setTokenToHeader } from '../actions/tokenActions';
import { handleAuthFailure } from '../actions/userActions';

function* signInUser({ payload }) {
  try {
    const response = yield call(UserService.signIn, payload.username, payload.password);
    if (response.status === 200) {
      yield put({ type: userActions.AUTHENTICATE_USER_SUCCESS });
      yield put(setTokenToHeader(response.headers.token));

      yield put(resetToMainDrawer());
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

export default function* userSaga() {
  yield all([
    takeEvery(userActions.USER_SIGN_IN, signInUser),
  ]);
}
