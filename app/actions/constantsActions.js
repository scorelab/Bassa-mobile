<<<<<<< HEAD
import {constantsActions} from './types'

export const getIP = () => {
    return {
        type: constantsActions.GET_IP
    }
}

export const getPort = () => {
    return {
        type: constantsActions.GET_PORT
    }
}

export const getKey = () => {
    return {
        type: constantsActions.GET_KEY
    }
}

export const setIP = (ip) => {
    return {
        type: constantsActions.SET_IP,
        ip
    }
}

export const setPort = (port) => {
    return {
        type: constantsActions.SET_PORT,
        port
    }
}
=======
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

export const setHostUrl = url => {
  return {
    type: constantsActions.SET_HOST_URL,
    payload: url,
  };
};

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
>>>>>>> 20b35757d022805dac2c45abcbfe1b857b2d9336
