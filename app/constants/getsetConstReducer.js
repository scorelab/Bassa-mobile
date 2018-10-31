import { getsetActions } from '../actions/types';

const initialState = {
  hostUrl: 'http://10.0.3.2',
  hostPort: 5000,
  key: '123456789'
};

function getSetReducer(state = initialState, action) {
  switch (action.type) {
    //Keys
    case getsetActions.GET_KEY:
      return state.key;
    case getsetActions.SET_KEY:
      return {
        ...state,
        key: action.payload
      };
    //HOSTUrls
    case getsetActions.GET_HOST_URL:
      return state.hostUrl;
    case getsetActions.SET_HOST_URL:
      return {
        ...state,
        hostUrl: action.payload
      };
    //HOSTPORTs
    case getsetActions.GET_HOST_PORT:
      return state.hostPort;
    case getsetActions.SET_HOST_PORT:
      return {
        ...state,
        hostPort: action.payload
      };
    default:
      return state;
  }
}

export default getSetReducer;
