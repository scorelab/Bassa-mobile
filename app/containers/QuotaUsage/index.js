// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { theme } from '../../styles';

class QuotaUsage extends Component {
  static navigationOptions = {
    tabBarLabel: 'Quota Usage',
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.PRIMARY_STATUS_BAR_COLOR} />
        <Text style={styles.welcome}>
          Quota Usage Screen
        </Text>
      </View>
    );
  }
}

export default QuotaUsage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
