// @flow
import { constantsActions } from '../actions/types';

const initialState = {
  hostUrl: 'http://10.0.3.2',
  hostPort: 5000,
  key: '123456789',
};

function constantsReducer(state = initialState, action) {
  switch (action.type) {
    case constantsActions.GET_HOST_URL:
      return state.hostUrl;
    case constantsActions.GET_HOST_PORT:
      return state.hostPort;
    case constantsActions.GET_KEY:
      return state.key;
    case constantsActions.SET_HOST_URL:
      return {
        ...state,
        hostUrl: action.payload,
      };
    case constantsActions.SET_HOST_PORT:
      return {
        ...state,
        hostPort: action.payload,
      };
    case constantsActions.SET_KEY:
      return {
        ...state,
        key: action.payload,
      };
    default:
      return state;
  }
}

export default constantsReducer;
