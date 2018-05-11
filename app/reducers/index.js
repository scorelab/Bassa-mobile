import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import AppNavigator from '../containers/RootNavigator';

const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
  app: (state = {}, action) => state,
  nav: navReducer,
});

export default rootReducer;
