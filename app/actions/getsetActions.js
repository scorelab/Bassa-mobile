import { constantsActions } from "./types";

// Getting and Setting Keys
export const getKey = () => {
  return {
    type: getsetActions.GET_KEY
  };
};

export const setKey = key => {
  return {
    type: getsetActions.SET_KEY,
    payload: key
  };
};

//Getting and Setting HostPorts
export const getHostPort = () => {
  return {
    type: getsetActions.GET_HOST_PORT
  };
};

export const setHostPort = port => {
  return {
    type: getsetActions.SET_HOST_PORT,
    payload: port
  };
};

//Getting and Setting HostUrls
export const getHostUrl = () => {
  return {
    type: getsetActions.GET_HOST_URL
  };
};

export const setHostUrl = url => {
  return {
    type: getsetActions.SET_HOST_URL,
    payload: url
  };
};
