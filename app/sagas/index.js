import { all, spawn } from 'redux-saga/effects';

import userSaga from './userSaga';
import tokenSaga from './tokenSaga';

export default function* rootSaga() {
  yield all([
    spawn(userSaga),
    spawn(tokenSaga),
  ]);
}
