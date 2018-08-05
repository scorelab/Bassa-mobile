// @flow
import { downloadsActions } from '../actions/types';

const initialState = {
  lastDownloadTimestamp: null,
};

function downloadsReducer(state = initialState, action) {
  switch (action.type) {
    case downloadsActions.UPDATE_LAST_DOWNLOAD_TIMESTAMP:
      return { ...state, lastDownloadTimestamp: Date.now() };
    default:
      return state;
  }
}

export default downloadsReducer;
