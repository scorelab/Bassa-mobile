// @flow
import { StackActions, NavigationActions } from 'react-navigation';

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

