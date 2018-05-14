import React from 'react';
import { createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';

// root routes
import Init from './Init';
import SignIn from './SignIn';

import CustomDrawer from './CustomDrawer';

// downloads routes
import InProgressDownloads from './InProgressDownloads';

export const DashboardTabs = createMaterialTopTabNavigator({
  InProgressDownloads: { screen: InProgressDownloads },

});

const Drawer = createDrawerNavigator(
  {
    MainDrawer: { screen: DashboardTabs },
  },
  {
    contentComponent: props => <CustomDrawer {...props} />,
  },
);

const AppNavigator = createStackNavigator({
  Init: { screen: Init },
  SignIn: { screen: SignIn },
  MainDrawer: { screen: Drawer, navigationOptions: { header: null } },
});

export default AppNavigator;
