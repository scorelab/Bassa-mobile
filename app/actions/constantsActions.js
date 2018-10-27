// @flow
import { constantsActions } from './types';

export const getHostUrl = () => {
  return {
    type: constantsActions.GET_HOST_URL,
  };
};

export const getHostPort = () => {
  return {
    type: constantsActions.GET_HOST_PORT,
  };
};

export const getKey = () => {
  return {
    type: constantsActions.GET_KEY,
  };
};
