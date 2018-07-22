// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  StatusBar,
  FlatList,
  Text,
  Dimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CompletedDownloadsRow from './CompletedDownloadsRow';
import DownloadService from '../../services/downloadService';
import { theme } from '../../styles';

const HEIGHT: number = Dimensions.get('window').height;
const WIDTH: number = Dimensions.get('window').width;

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

  componentDidUpdate(prevProps) {
    if (this.props.downloads.lastDownloadTimestamp !== prevProps.lastDownloadTimestamp) {
      this.fetchDownloads();
    }
  }

  renderPlaceholder() {
    return (
      <View pointerEvents={'box-none'} style={styles.placeholderContainer}>
        <Icon name="md-sad" size={45} color={'grey'} />
        <Text style={styles.placeholderText}>No completed downloads</Text>
      </View>
    );
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
        {!this.state.isRefreshing
          && this.state.downloadsList.length === 0
          ? this.renderPlaceholder() : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  downloads: state.downloads,
});

export default connect(mapStateToProps)(CompletedDownloads);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  placeholderContainer: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
    marginTop: -80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 23,
  },
});
