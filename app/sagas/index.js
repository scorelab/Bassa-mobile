import { all, spawn } from 'redux-saga/effects';

import userSaga from './userSaga';
import tokenSaga from './tokenSaga';
import appSaga from './appSaga';

export default function* rootSaga() {
  yield all([
    spawn(appSaga),
    spawn(userSaga),
    spawn(tokenSaga),
  ]);
}
