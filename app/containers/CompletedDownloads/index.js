// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  StatusBar,
  FlatList,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import CompletedDownloadsRow from './CompletedDownloadsRow';
import DownloadService from '../../services/downloadService';
import { theme } from '../../styles';

class CompletedDownloads extends Component {
  static navigationOptions = {
    title: 'Downloads',
    tabBarLabel: 'Completed',
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      downloadsList: [],
    };

    this.fetchDownloads = this.fetchDownloads.bind(this);
  }

  componentDidMount() {
    this.fetchDownloads();
  }

  async fetchDownloads() {
    this.setState({ isRefreshing: true });
    try {
      const response = await DownloadService.getAllDownloads();
      this.setState({ downloadsList: response.data, isRefreshing: false });
    } catch (error) {
      Alert.alert('Error', 'An error occured while fetching completed downloads');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.PRIMARY_STATUS_BAR_COLOR} />
        <FlatList
          data={this.state.downloadsList}
          refreshing={this.state.isRefreshing}
          onRefresh={this.fetchDownloads}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => <CompletedDownloadsRow item={item} />}
        />
      </View>
    );
  }
}

export default CompletedDownloads;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
});
