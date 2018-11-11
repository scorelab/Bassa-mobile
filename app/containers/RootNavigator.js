import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

// root routes
import Init from './Init';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AboutScreen from './AboutScreen';

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

export const DownloadsTabs = createMaterialTopTabNavigator(
  {
    InProgressDownloads: { screen: InProgressDownloads },
    CompletedDownloads: { screen: CompletedDownloads },
  },
  {
    initialRouteName: 'InProgressDownloads',
    swipeEnabled: false,
    tabBarOptions,
  },
);

export const AccountsTabs = createMaterialTopTabNavigator(
  {
    Approvals: { screen: Approvals },
    QuotaUsage: { screen: QuotaUsage },
  },
  {
    initialRouteName: 'Approvals',
    swipeEnabled: false,
    tabBarOptions,
  },
);

const createStackForDrawer = (stackName, screen, headerTitle) =>
  createStackNavigator(
    {
      [stackName]: { screen },
    },
    {
      navigationOptions: ({ navigation }) => ({
        // If unspecified, fall back to default navigationOptions' title (set in Component)
        title: headerTitle || undefined,
        headerLeft: <Icon
          name="md-menu"
          style={{ color: '#FFF', fontSize: 35, marginLeft: 20 }}
          onPress={() => navigation.openDrawer()}
        />,
        headerStyle: {
          backgroundColor: theme.PRIMARY_COLOR,
          elevation: 0,
        },
        headerTintColor: theme.TEXT_COLOR_INVERT,
      }),
    },
  );

const Drawer = createDrawerNavigator(
  {
    Downloads: {
      screen: createStackForDrawer('Downloads', DownloadsTabs, 'Downloads'),
    },
    Accounts: createStackForDrawer('Accounts', AccountsTabs, 'Accounts'),
    About: {
      screen: createStackForDrawer('About', AboutScreen),
    },
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
