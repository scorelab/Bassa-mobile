import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import AppNavigator from '../containers/RootNavigator';
import appReducer from './appReducer';
import userReducer from './userReducer';
import downloadsReducer from './downloadsReducer';
import getSetReducer from './getsetConstReducer';

const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  nav: navReducer,
  downloads: downloadsReducer,
  constants: getSetReducer,
});

export default rootReducer;
