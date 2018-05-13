// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

class InProgressDownloads extends Component {
  static navigationOptions = {
    tabBarLabel: 'In Progress',
    tabBarIcon: <Icon name="rocket" size={10} color="black" />,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.navigation.openDrawer();
  }
  render() {
    return (
      <View style={styles.container}>
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
