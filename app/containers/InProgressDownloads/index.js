// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { theme } from '../../styles';

class InProgressDownloads extends Component {
  static navigationOptions = {
    headerLeft: <Icon name='md-menu' size={20} color="black" />,
    title: 'Downloads',
    tabBarLabel: 'In Progress',
    tabBarIcon: <Icon name='md-download' size={20} color='#FFF' />,
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
          Downloads Screen
        </Text>
      </View>
    );
  }
}

export default InProgressDownloads;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
