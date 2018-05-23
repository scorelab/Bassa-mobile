// @flow
import { StackActions, NavigationActions } from 'react-navigation';

import { appActions } from './types';

export const resetToSignIn = () => {
  return StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'SignIn' }),
    ],
  });
};

export const resetToMainDrawer = () => {
  return StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'MainDrawer' }),
    ],
  });
};

export const closeDrawer = () => {
  return {
    type: appActions.CLOSE_DRAWER,
  };
};

export const openDrawer = () => {
  return {
    type: appActions.OPEN_DRAWER,
  };
};

export const setDrawerTab = (tabIndex) => {
  return {
    type: appActions.SET_DRAWER_TAB,
    payload: tabIndex,
  };
};

