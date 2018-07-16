import { create } from 'axios';
import * as KeychainService from 'react-native-keychain';

import APIConstants from '../constants/API';
import { setTokenToHeader } from '../actions/tokenActions';
import UserService from '../services/userService';
import { store } from '../App';

const MAX_RETRY_COUNT = 2;

const API = create({
  baseURL: `${APIConstants.HOST_URL}:${APIConstants.HOST_PORT}`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

API.interceptors.response.use(response => response, async (error) => {
  if (error.config && error.config.url
    && (!error.config.url.includes('login') || !error.config.url.includes('regularuser'))) {
    error.config.headers.retryCount = error.config.headers.retryCount ? error.config.headers.retryCount : 0;
    if (error.config.headers.retryCount < MAX_RETRY_COUNT) {
      try {
        const credenrials = await KeychainService.getGenericPassword();
        if (credenrials && credenrials.username && credenrials.password) {
          const response = await UserService.signIn({ user_name: credenrials.username, password: credenrials.password });
          error.config.headers.token = response.headers.token;
          error.config.headers.retryCount = error.config.headers.retryCount + 1;
          store.dispatch(setTokenToHeader(response.headers.token));
          return API.request(error.config);
        }
      } catch (err) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

export default {
  API,
};
