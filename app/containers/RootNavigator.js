// @flow
import React from 'react';
import { createStackNavigator } from 'react-navigation';

// root routes
import Init from './Init';

export const AppNavigator = createStackNavigator({
  Init: { screen: Init },
});