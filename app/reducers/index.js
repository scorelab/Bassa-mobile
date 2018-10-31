import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";

import getSetReducer from "./getsetConstReducer";
import AppNavigator from "../containers/RootNavigator";
import appReducer from "./appReducer";
import userReducer from "./userReducer";
import downloadsReducer from "./downloadsReducer";

const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
  constants: getSetReducer,
  app: appReducer,
  user: userReducer,
  nav: navReducer,
  downloads: downloadsReducer
});

export default rootReducer;
