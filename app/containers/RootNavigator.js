import React from 'react';
import { createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';

// root routes
import Init from './Init';
import SignIn from './SignIn';
import SignUp from './SignUp';

import CustomDrawer from './CustomDrawer';

// dashboard routes
import InProgressDownloads from './InProgressDownloads';
import CompletedDownloads from './CompletedDownloads';

// admin routes
import Approvals from './Approvals';
import QuotaUsage from './QuotaUsage';

import { theme } from '../styles';

const tabBarOptions = {
  labelStyle: {
    fontSize: 15,
  },
  style: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  scrollEnabled: false,
};

export const DownloadsTabs = createMaterialTopTabNavigator({
  InProgressDownloads: { screen: InProgressDownloads },
  CompletedDownloads: { screen: CompletedDownloads },

}, {
  initialRouteName: 'InProgressDownloads',
  swipeEnabled: false,
  tabBarOptions,
});

export const AccountsTabs = createMaterialTopTabNavigator({
  Approvals: { screen: Approvals },
  QuotaUsage: { screen: QuotaUsage },

}, {
  initialRouteName: 'Approvals',
  swipeEnabled: false,
  tabBarOptions,
});

const Drawer = createDrawerNavigator(
  {
    Downloads: { screen: DownloadsTabs },
    Accounts: { screen: AccountsTabs },
  },
  {
    contentComponent: props => <CustomDrawer {...props} />,
  },
);

const AppNavigator = createStackNavigator({
  Init: { screen: Init },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  MainDrawer: { screen: Drawer, navigationOptions: { header: null } },
});

export default AppNavigator;
