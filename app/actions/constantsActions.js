// @flow
import { constantsActions } from './types';

<<<<<<< HEAD
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
=======
export const setKey = key => {
  return {
    type: constantsActions.SET_KEY,
    payload: key,
  };
};

export const setHostPort = port => {
  return {
    type: constantsActions.SET_HOST_PORT,
    payload: port,
>>>>>>> HEAD@{1}
  };
};

export const setHostUrl = url => {
  return {
    type: constantsActions.SET_HOST_URL,
    payload: url,
  };
};

<<<<<<< HEAD
export const setHostPort = port => {
  return {
    type: constantsActions.SET_HOST_PORT,
    payload: port,
  };
};

export const setKey = key => {
  return {
    type: constantsActions.SET_KEY,
    payload: key,
  };
};
=======
export const getKey = () => {
  return {
    type: constantsActions.GET_KEY,
  };
};

export const getHostPort = () => {
  return {
    type: constantsActions.GET_HOST_PORT,
  };
};

export const getHostUrl = () => {
  return {
    type: constantsActions.GET_HOST_URL,
  };
};
>>>>>>> HEAD@{1}
