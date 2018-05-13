import { createStackNavigator } from 'react-navigation';

// root routes
import Init from './Init';

const AppNavigator = createStackNavigator({
  Init: { screen: Init },
});

export default AppNavigator;
