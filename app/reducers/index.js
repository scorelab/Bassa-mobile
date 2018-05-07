import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    app: (state = {}, action) => state,
});

export default rootReducer;
