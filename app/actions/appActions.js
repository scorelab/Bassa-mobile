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

export const configurePushNotifications = () => {
  return {
    type: appActions.CONFIGURE_PUSH_NOTIFICATIONS,
  };
};

export const connectToSocketIoServer = () => {
  return {
    type: appActions.CONNECT_TO_SOCKET_IO_SERVER,
  };
};

export const disconnectFromSocketIoServer = () => {
  return {
    type: appActions.DISCONNECT_FROM_SOCKET_IO_SERVER,
  };
};

export const setDrawerTab = (tabIndex) => {
  return {
    type: appActions.SET_DRAWER_TAB,
    payload: tabIndex,
  };
};

export const handleKeychainErrors = (error) => {
  return {
    type: appActions.HANDLE_KEYCHAIN_ERRORS,
    payload: error,
  };
};

