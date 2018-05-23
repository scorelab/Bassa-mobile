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

class CompletedDownloads extends Component {
  static navigationOptions = {
    title: 'Downloads',
    tabBarLabel: 'Completed',
    tabBarIcon: <Icon name='md-cloud-download' size={20} color='#FFF' />,
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
          Completed Downloads Screen
        </Text>
      </View>
    );
  }
}

export default CompletedDownloads;

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
