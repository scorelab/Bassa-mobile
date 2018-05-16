// @flow
import { takeEvery, all } from 'redux-saga/effects';

import { tokenActions } from '../actions/types';
import APIBuilder from '../helpers/APIBuilder';

function* setToken({ payload }) {
  APIBuilder.API.defaults.headers.common['token'] = `${payload}`;
}

export default function* tokenSaga() {
  yield all([
    takeEvery(tokenActions.SET_TOKEN_TO_HEADER, setToken),
  ]);
}
